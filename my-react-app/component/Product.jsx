export default function Product(props) {
  const { id, name, category, price, stock, image, handleDelete, handleEdit } = props;

  return (
    <div className="p-4 mb-4 bg-gray-800 rounded-xl border border-gray-700 flex flex-row items-center gap-6 w-full max-w-4xl mx-auto shadow-lg">

      <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col items-start justify-start gap-1 min-w-0">
        <h2 className="text-xl font-bold text-white truncate">{name}</h2>
        <p className="text-indigo-400 text-sm font-medium mb-2">{category}</p>
        <div className="flex items-center gap-4">
          <p className="text-2xl font-black text-green-400">${price}</p>
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${stock < 5 ? 'bg-red-900/50 text-red-400' : 'bg-gray-700 text-gray-300'}`}>
            Stock: {stock}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-24">
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 rounded-lg text-sm font-semibold transition">
          Add
        </button>

        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white py-1.5 rounded-lg text-sm font-semibold transition"
          onClick={() => handleEdit(id)}
        >
          Edit
        </button>

        <button
          className="bg-rose-600 hover:bg-rose-500 text-white py-1.5 rounded-lg text-sm font-semibold transition"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}