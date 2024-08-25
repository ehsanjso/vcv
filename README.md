# VCV

## Run website locally

## 1. Install MongoDB (Mac Instructions (Catalina onwards))

If you have MongoDB installed on your os you can pass this step.

you can follow this tutorial: https://zellwk.com/blog/install-mongodb/

`brew tap mongodb/brew`

`brew install mongodb-community`

`sudo mkdir -p /System/Volumes/Data/data/db`

``sudo chown -R `id -un` /System/Volumes/Data/data/db``

## 2. Install and Open MongoDB Compass

If you have MongoDB installed on your os you can pass this step.

link: https://www.mongodb.com/try/download/compass

## 3. Start MongoDB

The command depends on your os. If you are using mac os and
If you installed MongoDB based on the tutorial then you to start MongoDB:

`mongod`

## 4. Start VCV

Only for the first time to install all packages.

`pnpm i`

After all the packages are installed to run the project:

`pnpm dev`

The project should start on `localhost:3000`

## Design File

The figma desing file is included as `VCV.fig` in the root of the repo.
In the figma design file I wrote some thoughts on each part. Mostly, around future work or some of the decisions that were made.

## Design Decisions

The project is built on `Next.js` / `MongoDB` / `tPRC`.

`Next.js` was an obvious choice since it is a fullstack framework. However, the reason I chose `MongoDB` to store data was mostly due to the type of data we keep on the project which was pretty simple and not much heavy operation needed. `tRPC` was something that I also used for the first time. It offers a really seamless integeration with the rest of the stack providing a full type safety through the API.

For the design system I used `shadcn/ui`. It is pretty lightweight and looks great!

The heart of the user interface is the tree visualization which is visualized using `React Flow`. This library provides a really robost api to visualize the tree. Also, gives us enough flexibility and customizablity on the node styling.

The layouting for the tree is done through `d3`. Initially I wanted to also draw the tree using `d3`, but I realized it might get larger and heavier overall and kinda felt out of scope of the project.
