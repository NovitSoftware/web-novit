export default function TestStyles() {
  return (
    <div className="w-full min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Test Tailwind</h1>
        <p className="text-gray-600">Si ves esto con estilos, Tailwind funciona!</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Botón de prueba
        </button>
      </div>
    </div>
  );
}
