import { Facebook, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import darielImg from '../assets/images/leiradnoznag.webp';
import janImg from '../../assets/img/logo_imgs.png';
import gridBg from '../assets/images/squad-grid.png';
import { useLanguage } from '../context/LanguageContext';

export default function Team() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const teamMembers = [
    {
      name: 'Dariel Ganzon',
      role: t.team.member1_role,
      image: darielImg,
      bio: t.team.member1_bio,
      facebook: 'https://www.facebook.com/LeiradNoznag/',
      email: 'darielganzon2023@gmail.com',
    },
    {
      name: 'Jan Clyde Villavelez',
      role: t.team.member2_role,
      image: janImg,
      bio: t.team.member2_bio,
      facebook: 'https://www.facebook.com/jan.clyde.9404',
      email: 'jankuraido@gmail.com',
    },
  ];

  return (
    <section id="team" className="relative overflow-hidden bg-black py-16 text-white sm:py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundColor: '#050505',
          backgroundImage: `url(${gridBg})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '420px auto',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 sm:mb-16 lg:mb-24 lg:flex-row lg:items-end lg:justify-between"
        >
          <h2 className="heading-2 max-w-2xl text-white sm:text-4xl lg:text-5xl">
            {t.team.title}
          </h2>
          <blockquote className="max-w-sm">
            <p className="body-3 text-slate-300">
              {t.team.quote}
            </p>
            <footer className="caption-4 mt-3 font-semibold uppercase tracking-widest text-[#D4AF37]">
              {t.team.admin}
            </footer>
          </blockquote>
        </motion.div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-4 px-4 pb-2 [scrollbar-color:rgba(255,255,255,0.45)_transparent] [scrollbar-width:thin] sm:-mx-6 sm:scroll-pl-6 sm:px-6 lg:mx-auto lg:grid lg:max-w-5xl lg:grid-cols-2 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0">
          {teamMembers.map((member, index) => (
            <article
              key={member.name}
              tabIndex={0}
              className="group relative h-[28rem] w-[min(20rem,calc(100vw-4.5rem))] shrink-0 snap-start cursor-pointer overflow-hidden border border-white/5 bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] sm:h-[32rem] lg:h-[34rem] lg:w-auto lg:shrink"
            >
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:opacity-60 lg:grayscale lg:group-hover:scale-105 lg:group-hover:opacity-100 lg:group-hover:grayscale-0 lg:group-focus-within:scale-105 lg:group-focus-within:opacity-100 lg:group-focus-within:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20" />
              <div className="absolute left-4 top-4 z-20 h-8 w-8 border-l border-t border-white/20 transition-colors duration-500 group-hover:border-[#D4AF37] group-focus-within:border-[#D4AF37]" />
              <div className="absolute bottom-4 right-4 z-20 h-8 w-8 border-b border-r border-white/20 transition-colors duration-500 group-hover:border-[#D4AF37] group-focus-within:border-[#D4AF37]" />
              <div className="absolute right-4 top-4 z-20 text-5xl font-bold text-white/10 mix-blend-overlay sm:text-6xl">
                0{index + 1}
              </div>

              <div className="absolute bottom-0 left-0 z-30 flex w-full translate-y-0 flex-col justify-end p-5 opacity-100 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:transition-opacity sm:p-6 lg:translate-y-4 lg:p-8 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
                <span className="caption-4 mb-3 flex items-center gap-2 font-semibold uppercase tracking-widest text-[#D4AF37]">
                  <span className="h-px w-4 bg-[#D4AF37]" />
                  {member.role}
                </span>
                <h3 className="heading-3 mb-2 font-bold uppercase leading-none tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {member.name}
                </h3>
                <p className="body-6 text-slate-300 sm:body-3">{member.bio}</p>
                <div className="mt-4">
                  <div className="flex items-center justify-end border-t border-white/10 pt-4">
                    <div className="flex items-center gap-3 text-slate-400">
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Facebook`} className="transition-colors duration-300 hover:text-[#D4AF37]">
                        <Facebook size={18} />
                      </a>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(member.email)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Email ${member.name} on Gmail`}
                        className="transition-colors duration-300 hover:text-[#D4AF37]"
                      >
                        <Mail size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
