mongoose.connect('mongodb+srv://dwcks:dwcks@cluster0.pfezd.mongodb.net/');

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Thêm bcrypt để hash mật khẩu

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/web503', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    avatar: { type: String, default: 'https://via.placeholder.com/150' },
    description: { type: String, default: 'Chưa có mô tả' }
});
const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    comments: [{
        content: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
    }]
});
const Post = mongoose.model('Post', postSchema);

const secretKey = 'mysecretkey';
const saltRounds = 10; // Số vòng salt cho bcrypt

const auth = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Chưa đăng nhập' });
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

app.post('/register', async (req, res) => {
    const { email, password, name, avatar, description } = req.body;
    if (!email || !password || password.length < 6 || !email.includes('@')) {
        return res.status(400).json({ message: 'Email hoặc mật khẩu không hợp lệ' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash mật khẩu
        const user = new User({
            email,
            password: hashedPassword,
            name: name || email,
            avatar: avatar || 'https://via.placeholder.com/150',
            description: description || 'Chưa có mô tả'
        });
        await user.save();
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        res.status(400).json({ message: 'Email đã tồn tại' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Sai email hoặc mật kh��u' });

    const isMatch = await bcrypt.compare(password, user.password); // So sánh mật khẩu
    if (!isMatch) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });

    const token = jwt.sign({ id: user._id }, secretKey);
    res.json({ token, userId: user._id, avatar: user.avatar, email: user.email, name: user.name });
});

app.post('/post', auth, async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Thiếu tiêu đề hoặc nội dung' });
    const post = new Post({ title, content, author: req.user.id });
    await post.save();
    res.json({ message: 'Đăng bài thành công' });
});

app.put('/post/:id', auth, async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    if (post.author.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Không có quyền cập nhật' });
    }
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();
    res.json({ message: 'Cập nhật bài viết thành công' });
});

app.delete('/post/:id', auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    if (post.author.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Không có quyền xóa' });
    }
    await Post.deleteOne({ _id: req.params.id });
    res.json({ message: 'Xóa bài viết thành công' });
});

app.post('/post/:id/comment', auth, async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Nội dung comment không được trống' });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    post.comments.push({ content, author: req.user.id });
    await post.save();
    res.json({ message: 'Thêm comment thành công' });
});

app.put('/post/:postId/comment/:commentId', auth, async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Nội dung comment không được trống' });
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Không tìm thấy comment' });
    if (comment.author.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Không có quyền cập nhật comment' });
    }
    comment.content = content;
    await post.save();
    res.json({ message: 'Cập nhật comment thành công' });
});

app.delete('/post/:postId/comment/:commentId', auth, async (req, res) => {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Không tìm thấy comment' });
    if (comment.author.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Không có quyền xóa comment' });
    }
    post.comments.pull({ _id: req.params.commentId });
    await post.save();
    res.json({ message: 'Xóa comment thành công' });
});

app.put('/profile', auth, async (req, res) => {
    const { avatar, description, name, oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    // Cập nhật thông tin cơ bản
    user.avatar = avatar || user.avatar;
    user.description = description || user.description;
    user.name = name || user.name;

    // Kiểm tra và cập nhật mật khẩu
    if (newPassword) {
        if (!oldPassword) {
            return res.status(400).json({ message: 'Vui lòng nhập mật khẩu cũ để đổi mật khẩu mới' });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password); // So sánh mật khẩu cũ
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Mật khẩu mới phải dài ít nhất 6 ký tự' });
        }
        user.password = await bcrypt.hash(newPassword, saltRounds); // Hash mật khẩu mới
    }

    await user.save();
    res.json({ message: 'Cập nhật profile thành công', avatar: user.avatar, email: user.email, name: user.name });
});

app.get('/posts', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
        .populate('author', 'email avatar description name')
        .populate('comments.author', 'email name avatar')
        .skip(skip)
        .limit(limit);

    res.json({
        posts,
        totalPages: Math.ceil(totalPosts / limit),
        currentPage: page
    });
});

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
        .populate('author', 'email avatar description name')
        .populate('comments.author', 'email name avatar');
    if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    res.json(post);
});

app.get('/search', async (req, res) => {
    const { q, page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    let posts;
    let totalPosts;

    if (!q) {
        totalPosts = await Post.countDocuments();
        posts = await Post.find()
            .populate('author', 'email avatar description name')
            .populate('comments.author', 'email name avatar')
            .skip(skip)
            .limit(parseInt(limit));
    } else {
        const users = await User.find({
            $or: [
                { name: new RegExp(q, 'i') },
                { email: new RegExp(q, 'i') }
            ]
        });
        const userIds = users.map(user => user._id);

        posts = await Post.find({
            $or: [
                { title: new RegExp(q, 'i') },
                { content: new RegExp(q, 'i') },
                { author: { $in: userIds } }
            ]
        }).populate('author', 'email avatar description name')
            .populate('comments.author', 'email name avatar');

        totalPosts = posts.length;
        posts = posts.slice(skip, skip + parseInt(limit));
    }

    res.json({
        posts,
        totalPages: Math.ceil(totalPosts / limit),
        currentPage: parseInt(page)
    });
});

app.get('/profile/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    const posts = await Post.find({ author: req.params.id })
        .populate('author', 'email avatar description name')
        .populate('comments.author', 'email name avatar');
    const commentedPosts = await Post.find({ 'comments.author': req.params.id })
        .populate('author', 'email avatar description name')
        .populate('comments.author', 'email name avatar');

    const comments = commentedPosts.flatMap(post =>
        post.comments
            .filter(cmt => cmt.author._id.toString() === req.params.id)
            .map(cmt => ({ ...cmt.toObject(), postId: post._id, postTitle: post.title }))
    );

    res.json({
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        description: user.description,
        posts,
        comments
    });
});

app.get('/users', async (req, res) => {
    const users = await User.find({}, 'email avatar description name');
    res.json(users);
});

app.listen(5000, () => console.log('Server chạy ở port 5000'));
