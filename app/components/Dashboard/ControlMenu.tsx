import IconButton from '../IconButton';

export default function ControlMenu() {
  return (
    <section>
      <div className="flex items-center">
        <p className="font-bold text-2xl">Play</p>
        <ul className="list-none flex flex-row">
          <li>
            <button className="p-2">
              <IconButton />
            </button>
          </li>
          <li>
            <button className="p-2">redo</button>
          </li>
        </ul>
      </div>
      <p className="text-sm opacity-40">
        Adjust the parameters below to create a bespoke work of art using a unique hash
      </p>
    </section>
  );
}
