import ControlMenu from './ControlMenu';
import ProjectTitle from './ProjectTitle';

export default function Dashboard() {
  return (
    <section className="p-4">
      <ProjectTitle />
      <p>Select element here</p>
      <ControlMenu />
    </section>
  );
}
