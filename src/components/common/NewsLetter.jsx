const NewsLetter = () => {
  return (
    <div className="w-full px-6 md:px-12 lg:px-16 xl:px-24 -mt-24">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white max-w-6xl mx-auto text-center">
        <h3 className="text-2xl lg:text-4xl font-bold mb-4">
          Ready to Transform Your Property Marketing?
        </h3>
        <p className="text-blue-100 mb-8 max-w-3xl mx-auto text-lg">
          Join hundreds of satisfied clients who have revolutionized their property sales with our 360° marketing solutions.
        </p>
        <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
          Get Free Consultation
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;