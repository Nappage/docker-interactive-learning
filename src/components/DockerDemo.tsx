
const DockerDemo = () => {
  const [containers, setContainers] = useState([
    { id: 'demo1', name: 'webserver', status: 'stopped', image: 'nginx', port: '80', created: '1分前' },
    { id: 'demo2', name: 'database', status: 'running', image: 'mysql', port: '3306', created: '5分前' }
  ]);

  const [availableImages] = useState([
    { name: 'nginx', description: 'Webサーバー', size: '128MB' },
    { name: 'mysql', description: 'データベース', size: '496MB' },
    { name: 'redis', description: 'キャッシュサーバー', size: '98MB' },
    { name: 'python', description: '開発環境', size: '156MB' }
  ]);

  const [activeTab, setActiveTab] = useState('containers');
  const [selectedContainer, setSelectedContainer] = useState(null);

  const startContainer = (id) => {
    setContainers(containers.map(c => 
      c.id === id ? { ...c, status: 'running' } : c
    ));
  };

  const stopContainer = (id) => {
    setContainers(containers.map(c => 
      c.id === id ? { ...c, status: 'stopped' } : c
    ));
  };

  const removeContainer = (id) => {
    setContainers(containers.filter(c => c.id !== id));
    if (selectedContainer === id) {
      setSelectedContainer(null);
    }
  };

  const createContainer = (image) => {
    const newContainer = {
      id: `container-${Math.random().toString(36).substr(2, 9)}`,
      name: `${image.name}-${containers.length + 1}`,
      status: 'stopped',
      image: image.name,
      port: image.name === 'nginx' ? '80' : 
            image.name === 'mysql' ? '3306' : 
            image.name === 'redis' ? '6379' : '8000',
      created: 'たった今'
    };
    setContainers([...containers, newContainer]);
  };