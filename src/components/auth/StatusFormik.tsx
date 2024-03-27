export default function StatusFormik({ status }: { status: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg text-red-500 h-16 text-sm text-center mb-6 px-4 ${
        status ? ' bg-black/25 ' : ' '
      }`}
    >
      {status}
    </div>
  )
}
