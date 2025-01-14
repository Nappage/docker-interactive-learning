export interface Container {
  id: string;
  name: string;
  status: 'running' | 'stopped';
  image: string;
  port: string;
  created: string;
}

export interface Image {
  name: string;
  description: string;
  size: string;
}

export interface DockerArchitectureProps {
  containers: Container[];
  selectedContainer: string | null;
}

export interface ContainerCardProps {
  container: Container;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onRemove: (id: string) => void;
  selected: boolean;
  onClick: () => void;
}

export interface ImageCardProps {
  image: Image;
  onCreateContainer: (image: Image) => void;
}