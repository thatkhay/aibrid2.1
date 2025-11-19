import Link from "next/link";
import React from "react";

const MusicPage = () => {
  return (
    <div className="w-full bg-[#E5E5E5] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Music Available Everywhere Section */}
        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3640] mb-8">
            Music Available Everywhere...
          </h2>

          {/* Spotify Embed */}
          <div className="w-full rounded-lg overflow-hidden shadow-2xl">
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
        </section>

        {/* Music Videos Section */}
        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3640] mb-8">
            Music Videos
          </h2>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Video 1 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID_1"
                title="AirBrid Music - Beat Showcase 1"
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
                title="AirBrid Music - Production Process"
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
                title="AirBrid Music - Beat Making Session"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Live Videos Section */}
        <section>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3640] mb-8">
            Live Videos
          </h2>

          {/* Top Row - 3 Videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Live Video 1 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/YOUR_LIVE_VIDEO_1"
                title="AirBrid Music - Live Production 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>

            {/* Live Video 2 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/YOUR_LIVE_VIDEO_2"
                title="AirBrid Music - Studio Session"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>

            {/* Live Video 3 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/YOUR_LIVE_VIDEO_3"
                title="AirBrid Music - Beat Making Live"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>
          </div>

          {/* Bottom Row - 3 Videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Live Video 4 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/YOUR_LIVE_VIDEO_4"
                title="AirBrid Music - Collaboration Session"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>

            {/* Live Video 5 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/YOUR_LIVE_VIDEO_5"
                title="AirBrid Music - Performance"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>

            {/* Live Video 6 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/YOUR_LIVE_VIDEO_6"
                title="AirBrid Music - Production Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>
          </div>

          {/* Watch More Button */}
          <div className="flex justify-start">
            <Link
              href="https://www.youtube.com/@YOUR_CHANNEL"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2C3640] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#3a4a56] transition-colors"
            >
              watch more here
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MusicPage;
