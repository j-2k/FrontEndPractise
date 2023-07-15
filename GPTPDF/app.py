from dotenv import load_dotenv
import streamlit as st
from PyPDF2 import PdfReader
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
            #st.write(docSearchRes)

            openAIllm = ChatOpenAI(model_name="gpt-3.5-turbo", verbose=True)
            #context & history
            """
            memory = ConversationBufferMemory(
                memory_key="history",
                return_messages=True)
            
            convoChain = ConversationalRetrievalChain.from_llm(
                llm=openAIllm,
                retriever=knowledgeDB.as_retriever(),
                memory=memory
            )
            """

            conversation = ConversationChain(
                llm=openAIllm, 
                # We set a low k=2, to only keep the last 2 interactions in memory
                memory=ConversationBufferWindowMemory(k=2), 
                verbose=True
            )

            

            chain = load_qa_chain(openAIllm, chain_type="stuff")

            with get_openai_callback() as cb:
                gptResponse = chain.run(input_documents=docSearchRes, question=userQuestion)
                print(cb)
            
            st.write(gptResponse)

            st.write("TEST >>> " + conversation.predict(input=userQuestion))



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

        
    


