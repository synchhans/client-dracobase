import { useDosenRecents } from "@/hooks/useDosenRecents";
import Link from "next/link";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Image from "next/image";

export default function DosenRecentSection() {
  const { recents, loading, error } = useDosenRecents();

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Workspace Terkini Dosen
        </h2>
      </div>

      {loading && (
        <div className="flex justify-center p-4">
          <LoadingSpinner />
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && recents.length === 0 && (
        <p className="text-gray-500">
          Belum memiliki workspace. workspace untuk melihat materi yang sudah
          dibuat.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recents.map((item) => (
          <Link
            key={item.id}
            href={`/workspace/${item.workspace.id}`}
            className="block p-4 rounded-lg hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={item.workspace.language.icon}
                alt={item.workspace.language.name}
                width={50}
                height={50}
                className="w-8 h-8"
              />
              <h3 className="font-semibold truncate">{item.workspace.name}</h3>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2">
              {item.workspace.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
