
import Form from "@/components/form/form";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Form />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       <p>Design with <span>love</span> by <a href="www.ubaidismail.com">Ubaid Ismail</a></p>
      </footer>
    </div>
  );
}
