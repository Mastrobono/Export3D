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
      className={`mx-auto max-w-7xl md:max-w-8xl min-[1800px]:max-w-[1800px] rounded-md bg-lightgray shadow-xl my-24 ${classNames}`}
      {...props}
    >
      {children}
    </section>
  );
}
