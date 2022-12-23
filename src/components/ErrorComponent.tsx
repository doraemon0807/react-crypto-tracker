interface ErrorComponentProps {
  text: string;
}

function ErrorComponent({ text }: ErrorComponentProps) {
  return <h1>This component crashed: {text}</h1>;
}

export default ErrorComponent;
