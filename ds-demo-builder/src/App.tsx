import ColorSection from './ColorSection';
import TypographySection from './TypographySection';
import BorderRadiusSection from './BorderRadiusSection';
import SizesSection from './SizesSection';

export default function App() {
  return (
    <>
      <h1>styrbord-tokens</h1>
      <h2>Colors</h2>
      <ColorSection />
      <h2>Typography</h2>
      <TypographySection />
      <h2>Border Radius</h2>
      <BorderRadiusSection />
      <h2>Sizes</h2>
      <SizesSection />
    </>
  );
}
