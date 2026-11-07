import { useLanguage } from '../context/LanguageContext';
import TrueFocus from './TrueFocus';

export default function Tagline() {
  const { language } = useLanguage();
  const sentence = language === 'fil'
    ? 'Alamin kung sariwa ang isda\nbago mo ito bayaran.'
    : 'Know the fish is fresh\nbefore you pay for it.';

  return (
    <section className="overflow-hidden bg-white py-16 md:py-24" aria-label="Tagline">
      <div className="mx-auto max-w-[680px] px-6">
        <TrueFocus
          key={sentence}
          sentence={sentence}
          manualMode={false}
          focusStyle="highlight"
          easing="smooth"
          order="sequential"
          blurAmount={5}
          focusScale={1.04}
          unfocusedOpacity={0.4}
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
