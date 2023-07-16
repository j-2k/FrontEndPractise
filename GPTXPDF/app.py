import streamlit as st
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain


def extractText(pdfs):
    text = ""
    for pdf in pdfs:
        reader = PdfReader(pdf)
        for page in reader.pages:
            text += page.extract_text()
    return text

def extractChunks(rawText):
    #initializing chunk text splitter
    splitText = CharacterTextSplitter(
        separator = "\n",
        chunk_size = 1000,
        chunk_overlap = 100,
        length_function = len
    )
    chunks = splitText.split_text(rawText)
    return chunks

def getKnowledgeDB(rawChunks):
    embeddings = OpenAIEmbeddings()
    vectorDB = FAISS.from_texts(texts=rawChunks, embedding=embeddings)
    return vectorDB

def conversationChain(vectorstore):
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", verbose=True)
    memory = ConversationBufferMemory(
        memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory
    )
    return conversation_chain

def handleUserinput(question):
    response = st.session_state.conversation({'question': question})
    st.session_state.chat_history = response['chat_history']

    for i, message in enumerate(st.session_state.chat_history):
        if i % 2 == 0:
            st.write("USER" + message.content)
        else:
            st.write("BOT" + message.content)


def main():
    load_dotenv()
    st.set_page_config(page_title="GPT PDF Chatter", page_icon=":100:")

    if "conversation" not in st.session_state:
        st.session_state.conversation = None
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = None

    st.header("Chat using your PDFs")

    userQuestion = st.text_input("Ask about your PDFs")
    if userQuestion:
        handleUserinput(userQuestion)

    with st.sidebar:
        st.subheader("Your Documents")
        pdfDocs = st.file_uploader("Upload your PDFs here and click on process!", accept_multiple_files=True)
        
        if st.button("Process"):
            with st.spinner("Loading..."):
                # Extract PDF Text
                rawText = extractText(pdfDocs)

                # Extract Text Chunks
                chunks = extractChunks(rawText)

                # Create KnowledgeDB
                db = getKnowledgeDB(chunks)

                # create conversation chain
                st.session_state.conversation = conversationChain(db)








if __name__ == '__main__':
    main()