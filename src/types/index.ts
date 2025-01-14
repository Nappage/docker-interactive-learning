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