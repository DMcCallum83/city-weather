import Image from "next/image";

export const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "3rem",
      }}
    >
      <Image
        src="/sun.svg"
        alt="Loading spinner"
        style={{
          animation: "spin 3s linear infinite",
        }}
        height={100}
        width={100}
      />
      <span>Loading...</span>
    </div>
  );
};
