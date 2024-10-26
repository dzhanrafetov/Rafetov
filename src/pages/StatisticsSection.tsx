
const StatisticsSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-green-900 via-black to-black text-white py-16 px-6 sm:px-16">
      {/* Section Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 z-10">
        {/* Left Side - Statistics */}
        <div className="grid grid-cols-2 gap-6">
          {/* Statistic Block 1 */}
          <div className="bg-gray-800 bg-opacity-90 p-6 rounded-xl shadow-lg flex items-center justify-center text-center">
            <h2 className="text-6xl font-extrabold">89%</h2>
          </div>

          {/* Statistic Block 2 */}
          <div className="bg-gray-800 bg-opacity-90 p-6 rounded-xl shadow-lg flex items-center justify-center">
            <span className="text-5xl">🖱️</span>
          </div>

          {/* Statistic Block 3 - Linearity Tweet */}
          <div className="col-span-2 bg-gray-800 bg-opacity-90 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="text-white">
                <h3 className="text-xl font-bold">Linearity</h3>
                <p className="text-lg">89% of users turn to a competitor after a poor user experience</p>
              </div>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600">
                Follow
              </button>
            </div>
            <div className="text-sm text-gray-400">
              <span>189 Following </span>
              <span>12.6K Followers</span>
            </div>
          </div>
        </div>

        {/* Right Side - Chessboard Image or 3D Model */}
        <div className="bg-gray-800 bg-opacity-90 p-6 rounded-xl shadow-lg flex items-center justify-center">
          <img
            src="your-3d-model-or-image-url.png"
            alt="Chessboard"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
