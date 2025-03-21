interface ContainerProps {
  children: React.ReactNode;
  classNames?: string;
  props?: any;
  id?: string;
}

export default function Container({
  id,
  children,
  classNames,
  ...props
}: ContainerProps) {
  return (
    <section
      id={id}
      className={`mx-auto w-[calc(100%-6rem)]  rounded-md bg-lightgray shadow-xl my-12 ${classNames}`}
      {...props}
    >
      {children}
    </section>
  );
}
