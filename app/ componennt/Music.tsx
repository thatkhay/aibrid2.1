import React from "react";

const Music = () => {
  return (
    <section className="w-full bg-[#E5E5E5] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Music Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2C3640] mb-12">
            Music
          </h2>

          {/* Spotify Embed */}
          <div className="flex justify-center">
            <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src="https://open.spotify.com/embed/artist/YOUR_ARTIST_ID?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Live Video Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2C3640] mb-12">
            Live Video
          </h2>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Video 1 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID_1"
                title="Charles Cleyn - King of My Own"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>

            {/* Video 2 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID_2"
                title="Charles Cleyn - Sorry (Official Music Video)"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>

            {/* Video 3 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID_3"
                title="Charles Cleyn - Old Habits Live"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>
          </div>

          {/* Subscriber Count */}
          <p className="text-center text-lg italic text-gray-700">
            over 100,000 subscribers on YouTube
          </p>
        </div>
      </div>
    </section>
  );
};

export default Music;
