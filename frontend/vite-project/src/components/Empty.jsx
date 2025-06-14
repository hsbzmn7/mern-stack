import Image from "react-bootstrap/Image";

export const EmptyComponent = ({ message }) => {
  return (
    <div>
      <div>
        <Image
          src="https://staticmania.cdn.prismic.io/staticmania/16994ca5-ac01-4868-8ade-1b9e276ccdb3_Property+1%3DFolder_1.png"
          height={234}
          width={350}
          alt="404"
        />
      </div>
      <div className="text-center">{message}</div>
    </div>
  );
};
