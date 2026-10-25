import Hero from '../components/Hero';
import Categories from '../components/home/Categories';
import Featured from '../components/home/Featured';
import Promise from '../components/home/Promise';
import Guide from '../components/home/Guide';
import SupportTrust from '../components/SupportTrust';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Featured />
      <Promise />
      <Guide />
      <SupportTrust />
    </>
  );
}
