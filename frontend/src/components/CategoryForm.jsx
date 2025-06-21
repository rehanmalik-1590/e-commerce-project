

const CategoryForm = ({
    value, 
    setValue, 
    handleSubmit, 
    buttonText = 'Submit', 
    handleDelete,
}) => {
    return (
        <div className="p-3">
            <form onSubmit={handleSubmit} className="space-y-3">
                <input 
                    type="text" 
                    className="mt-1 p-2 border rounded w-full text-black" 
                    placeholder="Write category name"
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}
                    required
                />
                <div className="flex justify-between">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        {buttonText}
                    </button>

                    {handleDelete && (
                        <button onClick={handleDelete}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Delete</button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default CategoryForm