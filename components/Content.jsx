import Formulary from "./Formulary";
import TopDown from "./TopDown";

const Content = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Cliente</h1>
        <input
          type="text"
          placeholder="Presupuesto"
          className="border p-2 rounded w-[400px]"
        />
      </div>

      <Formulary />
      <TopDown />
    </main>
  );
};

export default Content;
