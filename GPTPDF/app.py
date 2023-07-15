from dotenv import load_dotenv
import streamlit as st
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
#streamlit run app.py
def main ():
    print("Heloo 1World")
    #start
    load_dotenv()
    st.set_page_config(page_title="Jumas GPT PDF Reader")
    st.header("Please drop your PDF here")

    #upload section
    pdf = st.file_uploader("Upload your PDF", type="pdf")

    #extract text from pdf
    if pdf is not None:
        pdf_reader = PdfReader(pdf)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()

        #initializing chunk text splitter
        splitText = CharacterTextSplitter(
            separator = "\n",
            chunk_size = 1000,
            chunk_overlap = 100,
            length_function = len
        )
        chunks = splitText.split_text(text)
        #st.write(chunks)

        #embedding phase
        oaiEmbedding = OpenAIEmbeddings()
        #semantic search phase FAISS
        knowledgeDB = FAISS.from_texts(chunks, oaiEmbedding) 

        userQuestion = st.text_input("Ask about this PDF: ")
        if userQuestion:
            docSearchRes = knowledgeDB.similarity_search(userQuestion)
            st.write(docSearchRes)


        



if __name__ == '__main__':
    main()