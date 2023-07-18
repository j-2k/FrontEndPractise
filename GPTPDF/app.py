from dotenv import load_dotenv
import streamlit as st
from PyPDF2 import PdfReader
import io
import os
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
#import openai
from langchain.chat_models import ChatOpenAI
from langchain.callbacks import get_openai_callback
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import ConversationChain
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import time

#streamlit run app.py
def main ():
    print("Starting GPT PDF 1...")
    #start
    load_dotenv()
    #st.set_page_config(page_title="Jumas GPT PDF Reader")
    #st.header("Please drop your PDF here")

    #upload section
    #pdf = st.file_uploader("Upload your PDF", type="pdf")

    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    #extract text from pdf

    loader = PyPDFLoader("uaec.pdf")
    #time.sleep(10)
    #loader = PyPDFLoader(os.stat(str(pdfBytes)))
    pages = loader.load_and_split()

    #pdf_reader = PdfReader(pdf)
    #text = ""
    #for page in pdf_reader.pages:
    #    text += page.extract_text()

    #initializing chunk text splitter
    splitText = RecursiveCharacterTextSplitter(#split text into chunk size of 1000 chars with overlap of100
        chunk_size = 1000,
        chunk_overlap = 100,
        length_function = len
    )
    chunks = splitText.split_documents(pages)

        #embedding phase
    oaiEmbedding = OpenAIEmbeddings()

        #semantic search phase FAISS
    knowledgeDB = FAISS.from_documents(chunks, oaiEmbedding)#embed the chunks into the vector db

    retriever=knowledgeDB.as_retriever()
    memory = ConversationBufferMemory(
        memory_key='chat_history', #0,1,2,3,4,5 even = user odd = assistant
        return_messages=True, 
        output_key='answer')


    #llm choice
    openAIllm = ChatOpenAI(model_name="gpt-3.5-turbo", verbose=True)

    #history
    chat = ConversationalRetrievalChain.from_llm(openAIllm,retriever=retriever,memory=memory)

    #userQuestion = st.text_input("Ask about this PDF: ")

    #print(f"Answer: {chat({'question': userQuestion})['answer'].strip()}")
    
    print("Welcome to the PDF ChatBot. Ask me anything about the document!")
    while True:
      try:
         userQuestion = input('ask your question: ')
         print(f"gpt pdf response: {chat({'question': userQuestion})['answer'].strip()}")
      except EOFError:
         break
      except KeyboardInterrupt:
         break




if __name__ == '__main__':
    #Choice()
    main()




def Choice():
    type = input("Type 1 for main 2 for context chat")
    if(type == "1"):
        main()
    else:
        ContextChat()
        



def ContextChat():
    isRunning = True
    messagesArr = ["Start"]
    while(isRunning):
        newMsg = input("Enter New Message")
        messagesArr.append(newMsg)
        print(messagesArr)

        stop = input("type end to stop")
        if(stop == "stop"):
            isRunning = False

        
    


