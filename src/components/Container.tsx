interface ContainerProps {
  children: React.ReactNode;
  classNames?: string;
}

export default function Container({ children, classNames = '' }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto ${classNames}`}>
      {children}
    </div>
  );
} 