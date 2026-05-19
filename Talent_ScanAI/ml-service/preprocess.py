import re
import string

# Simple list of English stop words to keep the project simple 
# without needing heavy libraries like NLTK to keep it light.
STOP_WORDS = {
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", 
    "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 
    'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 
    'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 
    'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 
    'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 
    'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 
    'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 
    'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 
    'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 
    'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 
    'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 
    'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 
    'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 
    'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', 
    "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', 
    "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 
    'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 
    'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"
}

def clean_resume(text):
    """
    Performs standard NLP preprocessing for traditional ML.
    """
    # 1. Convert to lowercase
    text = str(text).lower()

    # 2. Remove URLs, Hashtags, and Mentions (Common in modern resumes)
    text = re.sub(r'http\S+\s*', ' ', text)
    text = re.sub(r'#\S+', '', text)
    text = re.sub(r'@\S+', '  ', text)

    # 3. Remove Punctuation (Handling "Spam/Ham" style)
    # This removes characters like !?.,:; and special symbols
    text = re.sub(r'[%s]' % re.escape(string.punctuation), ' ', text)

    # 4. Remove non-ascii characters (Special symbols/bullets)
    text = re.sub(r'[^\x00-\x7f]', r' ', text)

    # 5. Tokenization & Stop Word Removal
    # We split the text into words, remove stop words, and join them back
    words = text.split()
    filtered_words = [word for word in words if word not in STOP_WORDS]
    
    # 6. Re-join words into a clean string
    # This also handles extra whitespace/missing words logic
    text = " ".join(filtered_words)

    return text.strip()

# Optional: To test if it's working, run 'python preprocess.py'
if __name__ == "__main__":
    sample = "Hello! Check out my portfolio at http://github.com/saagar. I love React and Node.js."
    print(f"Original: {sample}")
    print(f"Cleaned:  {clean_resume(sample)}")