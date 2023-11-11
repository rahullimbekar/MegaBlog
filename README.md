# Create React app with vite
	1- open terminal
	2- npm create vite@latest
		select react
		select javascript
	/* no 3 command use For installing node modules*/ go to directory
	3- npm i 			(for installing node module)
	 
#Pakages
	1- npm i @reduxjs/toolkit       (for state management)	
	2- npm i react-redux		    (for wrapup redux)
	3- npm i react-router-dom		(for navigation)		
	4- npm i appwrite				(for connecting backend database service)
	5- npm i @tinymce/tinymce-react	(for text editor)
	6- npm i html-react-parser		(for saving texteditor content to database)
	7- npm i react-hook-form 		(for using form )
	8- npm install -D tailwindcss postcss autoprefixer (tailwind css)
	   npx tailwindcss init -p

#Configuration
	1- tailwind configuration -> tailwind.config.js -> 
		content: [
   			 "./index.html",
  			  "./src/**/*.{js,ts,jsx,tsx}",
			  ],
	2- Add the Tailwind directives to your CSS
	   Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.->
		@tailwind base;
		@tailwind components;
		@tailwind utilities;

	