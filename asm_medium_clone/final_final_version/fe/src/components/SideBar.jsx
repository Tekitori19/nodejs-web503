export default function Sidebar({ users, viewProfile, currentUserId }) {
    return (
        <div className="w-60 bg-white my-12 rounded-md shadow-lg p-3 overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Người dùng</h2>
            <div className="space-y-4">
                {users.filter(user => user._id !== currentUserId).map((user) => (
                    <div key={user._id} className="flex items-center">
                        <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{user.name || user.email}</p>
                            <p className="text-sm text-gray-500">Người dùng</p>
                        </div>
                        <button
                            onClick={() => viewProfile(user._id)}
                            className="ml-2 text-indigo-600 hover:text-indigo-700 text-sm"
                        >
                            Xem profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
