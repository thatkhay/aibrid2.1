import Footer from "./ componennt/Footer";
import Header from "./ componennt/Header";
import HomePics from "./ componennt/HomePics";
import Music from "./ componennt/Music";

export default function Home() {
  return (
    <div>
      <Header />
      <div>
        <HomePics />
        <Music />
      </div>
      <Footer />
    </div>
  );
}
