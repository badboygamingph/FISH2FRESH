import { useLanguage } from '../context/LanguageContext';
import DotGrid from './DotGrid';
import TrueFocus from './TrueFocus';

export default function Tagline() {
  const { language } = useLanguage();
  const sentence = language === 'fil'
    ? 'Alamin kung sariwa ang isda\nbago mo ito bayaran.'
    : 'Know the fish is fresh\nbefore you pay for it.';

  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden bg-[#F6F6F6] py-16 md:py-24" aria-label="Tagline">
      <div className="absolute inset-0" aria-hidden="true">
        <DotGrid
          baseColor="#C5C5C5"
          activeColor="#2563EB"
          shape="circle"
          dotSize={5}
          gap={18}
          proximity={140}
          strength={1}
          bounce={0.6}
          tension={0.4}
          returnDuration={0.8}
          shockRadius={320}
          shockStrength={5}
          swell={0.8}
          stretch={0.5}
          glow={0.5}
          fade={0}
          intro={true}
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[680px] px-6">
        <TrueFocus
          key={sentence}
          sentence={sentence}
          manualMode={false}
          focusStyle="highlight"
          easing="smooth"
          order="sequential"
          blurAmount={1.5}
          focusScale={1.04}
          unfocusedOpacity={0.72}
          borderColor="#2563EB"
          highlightColor="#2563EB"
          animationDuration={0.5}
          pauseBetweenAnimations={1}
          cornerSize={16}
          borderWidth={3}
        />
      </div>
    </section>
  );
}
