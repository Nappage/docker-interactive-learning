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