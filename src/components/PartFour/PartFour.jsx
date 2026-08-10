import React from 'react';
import { HeartHandshake, UserCheck, Award, Sprout } from 'lucide-react';
import css from './PartFour.module.css';

const FEATURES = [
  {
    icon: HeartHandshake,
    title: 'Quality\nServices',
    text: 'Comprehensive livestock care services.',
  },
  {
    icon: UserCheck,
    title: 'Professional Team',
    text: 'Experienced team of veterinarians and livestock specialists.',
  },
  {
    icon: Award,
    title: 'Feeding Optimization',
    text: 'Enriched, award-winning livestock feeds for optimal growth.',
  },
  {
    icon: Sprout,
    title: 'Quality Products',
    text: 'Comprehensive quality feeds for livestock growth.',
  },
];

export default function PartFour() {
  return (
    <section className={css.Container}>
      <div className={css.Row}>
        {FEATURES.map(({ icon, title, text }) => (
          <div className={css.Item} key={title}>
            <div className={css.Content}>
              <h4 className={css.Title}>{title}</h4>
              <p className={css.Text}>{text}</p>
            </div>
            <div className={css.IconWrap}>
              {React.createElement(icon, { className: css.Icon, strokeWidth: 1.5 })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}