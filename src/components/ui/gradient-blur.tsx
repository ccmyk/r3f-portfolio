import styles from './gradient-blur.module.css';

export function GradientBlur() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className={`absolute inset-0 backdrop-blur-sm ${styles.mask1}`} />
      <div className={`absolute inset-0 backdrop-blur-md ${styles.mask2}`} />
      {/*... other divs for the effect... */}
    </div>
  );
}