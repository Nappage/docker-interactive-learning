# Docker Interactive Learning

Docker の基本概念と操作を視覚的に学べるインタラクティブな学習アプリケーション

## 概要

このプロジェクトは、Dockerの初学者向けに作られた教育用デモアプリケーションです。実際のDockerを操作することなく、Dockerの基本的な概念や操作方法を視覚的に学ぶことができます。

### 主な機能

- コンテナの作成・起動・停止・削除のシミュレーション
- Dockerアーキテクチャのリアルタイム可視化
- イメージ管理とコンテナ作成のデモ
- レイヤー構造の視覚的な説明

### 技術スタック

- React 18
- TypeScript
- Tailwind CSS
- Lucide React（アイコン）
- shadcn/ui（UIコンポーネント）

## セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/Nappage/docker-interactive-learning.git

# プロジェクトディレクトリに移動
cd docker-interactive-learning

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 使い方

1. イメージタブでは利用可能なDockerイメージを確認できます
2. イメージからコンテナを作成できます
3. コンテナタブでコンテナの操作（起動/停止/削除）ができます
4. 左側のアーキテクチャ図で、操作に応じた変化を確認できます

## デモで学べること

- Dockerのコンテナとイメージの関係
- コンテナのライフサイクル
- レイヤー構造の概念
- 基本的なコンテナ操作

## ライセンス

MIT License