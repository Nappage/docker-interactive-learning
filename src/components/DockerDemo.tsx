import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Layers, Play, Square, Trash2, Plus, Database } from 'lucide-react';

// アーキテクチャ図コンポーネント
const DockerArchitecture = ({ containers, selectedContainer }) => {
  return (
    <svg className="w-full h-96" viewBox="0 0 800 400">
      {/* Docker Host 背景 */}
      <rect x="50" y="20" width="700" height="360" fill="#f5f5f5" rx="8"/>
      <text x="70" y="50" className="text-sm font-semibold">Docker Host</text>

      {/* Docker Daemon 領域 */}
      <rect x="100" y="70" width="600" height="290" fill="#e1f5fe" rx="6"/>
      <text x="120" y="100" className="text-sm">Docker Daemon</text>

      {/* コンテナとレイヤーの描画 */}
      {containers.map((container, index) => {
        const isSelected = container.id === selectedContainer;
        const baseY = 130 + index * 120;
        const baseX = 150;
        const width = 500;
        
        return (
          <g key={container.id}>
            {/* コンテナレイヤー */}
            <rect 
              x={baseX} 
              y={baseY} 
              width={width} 
              height="30" 
              fill={container.status === 'running' ? '#4caf50' : '#9e9e9e'}
              opacity={isSelected ? 1 : 0.7}
              rx="4"
            />
            <text x={baseX + 10} y={baseY + 20} fill="white" className="text-sm">
              Container: {container.name} ({container.status})
            </text>

            {/* イメージレイヤー */}
            <rect 
              x={baseX} 
              y={baseY + 35} 
              width={width} 
              height="20" 
              fill="#2196f3"
              opacity={isSelected ? 1 : 0.7}
              rx="4"
            />
            <text x={baseX + 10} y={baseY + 50} fill="white" className="text-xs">
              Image: {container.image}
            </text>

            {/* ベースレイヤー */}
            <rect 
              x={baseX} 
              y={baseY + 60} 
              width={width} 
              height="20" 
              fill="#1976d2"
              opacity={isSelected ? 1 : 0.7}
              rx="4"
            />
            <text x={baseX + 10} y={baseY + 75} fill="white" className="text-xs">
              Base Layer: Linux
            </text>
          </g>
        );
      })}
    </svg>
  );
};

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

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dockerインタラクティブデモ</h1>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded ${activeTab === 'containers' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('containers')}
          >
            コンテナ
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'images' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('images')}
          >
            イメージ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左側: アーキテクチャ図 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Dockerアーキテクチャ</h2>
          <DockerArchitecture 
            containers={containers}
            selectedContainer={selectedContainer}
          />
        </div>

        {/* 右側: コンテナ/イメージ管理UI */}
        <div className="space-y-4">
          {activeTab === 'containers' ? (
            <div className="grid grid-cols-1 gap-4">
              {containers.map(container => (
                <Card 
                  key={container.id}
                  className={`cursor-pointer ${selectedContainer === container.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedContainer(container.id)}
                >
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Box className="h-5 w-5" />
                        {container.name}
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${
                        container.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
                      }`}>
                        {container.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        <span>イメージ: {container.image}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span>ポート: {container.port}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>作成: {container.created}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {container.status === 'stopped' ? (
                          <button
                            className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              startContainer(container.id);
                            }}
                          >
                            <Play className="h-4 w-4" />
                            起動
                          </button>
                        ) : (
                          <button
                            className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              stopContainer(container.id);
                            }}
                          >
                            <Square className="h-4 w-4" />
                            停止
                          </button>
                        )}
                        <button
                          className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeContainer(container.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          削除
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {availableImages.map(image => (
                <Card key={image.name} className="cursor-pointer hover:bg-gray-50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="h-5 w-5" />
                        {image.name}
                      </div>
                      <span className="text-sm text-gray-500">{image.size}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{image.description}</p>
                    <button
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => createContainer(image)}
                    >
                      <Plus className="h-4 w-4" />
                      コンテナを作成
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Docker の基本概念と操作方法</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold mb-2">基本概念</h3>
            <ul className="space-y-2">
              <li>• <strong>イメージ</strong>: アプリケーションとその実行環境のテンプレート</li>
              <li>• <strong>コンテナ</strong>: イメージから作成される実行インスタンス</li>
              <li>• <strong>レイヤー</strong>: イメージやコンテナを構成する階層構造</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">基本操作</h3>
            <ul className="space-y-2">
              <li>• <strong>コンテナの作成</strong>: イメージを選択して新しいコンテナを作成</li>
              <li>• <strong>起動/停止</strong>: コンテナの実行状態を制御</li>
              <li>• <strong>削除</strong>: 不要になったコンテナを削除</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DockerDemo;