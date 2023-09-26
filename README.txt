The folder contains the following files:

- app.py

	Google Colab Notebook where we implemented both Illustrator and Presentator.
	Here we used the following models imported from Hugging Face:

	1) "facebook/bart-large-cnn" for text summarization
	2) "naclbit/trinart_characters_19.2m_stable_diffusion_v1" for image generation in anime style
	3) spacy "en_core_web_md" to perform Named Entity Recognition and POS tagging
	
	Here you can find also the implamentation of the Flask application we use to create a server
	to run the website on.
	The last cell generates a link by which the website can be accessed externally

	
- "templates" folder: contains the "index.html" file for the rendering of the website layout

- "static" folder: contains the following:
	
	1) "images" folder: here the generated images (.gif format) will be generated for each chapter of the story
	2) "css" folder: contains the CSS for the rendering of the website style
	3) "index.js": Javascript for the behaviour of the website


Issues

- Sometimes when starting the server and accessing the website via link, the Javascript is not correctly read. 
  
  Solution: refresh the page until it works (usually after one time)

- The rendering of the GIF does not work on the webseite. 
  Unfortunately, we did not manage to find a solution for this issue.
  Generated images for each chapter can be seen under the images folder

- If the generation lasts too long, the browser send a ERR_NETWORK error. Images are anyway correctly generated in the backend
  but not displayed.
	
  Solution: this problem does not occurr when using a GPU Premium from the Colab Pro account.


Testing

Our suggestion would be to proceed as follows:

1) start the server on Google Colab. Ngrok will produce a link you can use to access the website
2) once opened the link, allow visiting the ngrok site
3) enter the metainformation, the text for the first chapter, then click on "GENERATE"
4) wait until the server generates the images. When it is ready, you should see a block underneath (where the image failed to be showed) and a "NEXT CHAPTER" button
5) before clicking on "NEXT CHAPTER", you can visualize the just generated images gif following the path "app > static > images" of the Google Drive shered folder. The number indicates the corresponding chapter (so img-1.gif will be the generated gif for chapter 1)
6) now, click on "NEXT CHAPTER" and proceed in the same way
7) when you are finished with the first test, refresh the page to insert the new data from the beginning
  