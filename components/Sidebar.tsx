import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      {/* Top bar for mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-100 p-4 shadow-md flex justify-around mb-20">
        <Link href="/materials" className="text-gray-800 font-semibold hover:text-blue-600">
          Materials
        </Link>
        <Link href="/metals" className="text-gray-800 font-semibold hover:text-blue-600">
          Metals
        </Link>
      </div>

      {/* Sidebar for larger screens */}
      <div className="hidden md:block w-30 md:w-64 h-screen bg-gray-100 p-4 shadow-md">
        <ul className="space-y-4">
          <li>
            <Link href="/materials" className="text-gray-800 font-semibold hover:text-blue-600">
              Materials
            </Link>
          </li>
          <li>
            <Link href="/metals" className="text-gray-800 font-semibold hover:text-blue-600">
              Metals
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
