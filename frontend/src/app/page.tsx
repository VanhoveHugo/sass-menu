import { MenuInterface } from "./utils/interfaces";

export default async function Home() {
  const data: Array<MenuInterface> = await getData();

  const orderData = data.reduce((acc: any, item) => {
    acc[item.attributes.Category] = [...(acc[item.attributes.Category] || []), item];
    return acc;
  }, {})

  function formatterNombre(nombre: number): string {
    const partieEntiere = Math.floor(nombre);
    const partieDecimale = nombre % 1;

    const partieEntiereFormatee = partieEntiere.toString().padStart(2, '0');
    const partieDecimaleFormatee = Math.round(partieDecimale * 100)
      .toString()
      .padStart(2, '0');

    return `${partieEntiereFormatee},${partieDecimaleFormatee}`;
  }


  return (
    <main className="flex flex-col m-4 p-4 border-2 border-emerald-600 rounded">
      <h1 className="mb-8 -mt-4 -mx-4 bg-emerald-600 text-4xl font-bold text-center py-4 text-white">
        MENU
      </h1>
      <ul className="grid gap-4 text-xl flex-wrap md:grid-cols-3 gap-8">
        {Object.entries(orderData).map(([categorie, data]) => (
          <div className="flex flex-col gap-2  w-full md:grid-cols-3" key={categorie}>
            <h2 className="text-md font-bold">{categorie}</h2>
            <ul className="flex flex-col gap-1">
              {(data as MenuInterface[]).map((plat: MenuInterface, index: number) => (
                <li key={index}>
                  <div className="flex justify-between items-center gap-2 ">
                    <p>{plat.attributes.Name}</p>
                    <div className="w-full flex-1 border-dashed my-4 border border-black" />
                    <p>{formatterNombre(plat.attributes.Price)}€</p>
                  </div>
                  <p className="text-sm text-emerald-600">{plat.attributes.Composition}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
      <footer className="bg-emerald-600 text-white text-sm font-bold p-2 mt-4 -mx-4 -mb-4">
        <p className="text-center">Prix TTC</p>
      </footer>
    </main>
  );
}

async function getData() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY,
      },
    })
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

