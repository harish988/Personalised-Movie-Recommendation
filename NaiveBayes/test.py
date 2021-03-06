from porter import PorterStemmer


def getwords(sentence):
 
    w = sentence
    
    #get rid of all stop words
    w= [x for x in w if not x in stopwords]
    
    #remove all things that are 1 or 2 characters long (punctuation)
    w= [x for x in w if len(x)>2]    
    
    #stem each word
    w= [stemmer.stem(x,0,len(x)-1) for x in w]
 
    
    return w


    
poslines = []
neglines = []

stopwords= open('F:/ifa/NaiveBayes/stopwords.txt', 'r').read().splitlines()
dataset= open('F:/ifa/NaiveBayes/training_set.csv', 'r',encoding="utf8")

dataset.readline()

poslines=[]
neglines=[]

for data in dataset:
    data.lower()
    datalines = data.split(",")[1].strip('"').split(' ')
    DataClass = data.split(",")[0]
    #tokenizing the sentence
    if int(DataClass)==0:
        poslines.append(datalines)  
    if int(DataClass)==1:
        neglines.append(datalines)
    else:
        continue
print( "The total positive words are:", len(poslines))
print ("The total negative words are: ", len(neglines))

poslineedited = []
neglinesedited = []


#there are total 6397 positives and negatives.
poslinesTrain= poslines[:3201]
neglinesTrain= neglines[:3196]

priorknowledgepo = []
priorknowledgeneg = []

priorknowledgeneg= 3196/ 6397
priorknowledgepo = 3201/ 6397


stemmer = PorterStemmer()
model = open('F:/ifa/NaiveBayes/model_file.csv', 'w',encoding="utf8")


trainset= [(x,1) for x in poslinesTrain] + [(x,-1) for x in neglinesTrain]
poswords={} #this dictionary stores counts for every word in positives
negwords={} #and negatives

for line,label in trainset: 
    words= getwords(line)

    for word in words:   
        word.lower()     
        #increment the counts for this word based on the label
        #the .get(x, 0) method returns the current count for word 
        #x, of 0 if the word is not yet in the dictionary
        if label==1: poswords[word]= poswords.get(word, 0) + 1
        if label==-1: negwords[word]= negwords.get(word, 0) + 1
positivewordlist = open('F:/ifa/NaiveBayes/positive-words.txt', 'r').read().splitlines()
negativewordlist = open('F:/ifa/NaiveBayes/negative-words.txt', 'r').read().splitlines()

#evaluate the test set
testset= open('F:/ifa/NaiveBayes/test_set.csv', 'r',encoding="utf8")
testset.readline()           
#make predictions
output = open("F:/ifa/NaiveBayes/prediction_file.csv", 'w')

for line in testset:
    linesplit = line.split()
    testwords= getwords(linesplit)
    totpos, totneg= 0.0, 0.0
    for word in testwords:
        word.lower()
        
        a= poswords.get(word,0.0) + 1.0
        b= negwords.get(word,0.0) + 1.0 
        totpos+= a/(a+b)
        totneg+= b/(a+b) 
        model.write("Word: " +str(word) + ",")
        model.write("Relative positive usage: " + str(totpos)+ ",")
        model.write("Relative negative usage: "+str(totneg)+ '\n')
       
 

file = open("F:/ifa/NaiveBayes/hello.txt",'w')
file.write('HELLO')
file.close()

testset= open('F:/ifa/NaiveBayes/review.txt', 'r',encoding="utf8")
#testset.readline()           

output = open("F:/ifa/NaiveBayes/output.txt", 'w',encoding="utf8")
#output.write
for line in testset:
    linesplit = line.split()
    testwords= getwords(linesplit)
    totpos, totneg= 0.0, 0.0
    for word in testwords:
        #output.write("inside for")
        word.lower()
        a= poswords.get(word,0.0) + 1.0
        b= negwords.get(word,0.0) + 1.0  
             
        totpos+= a/(a+b)
        totneg+= b/(a+b) 
        
    print("hello")
    if totneg>totpos: 
        output.write("+")
     
    if totneg<totpos: 
        output.write("-") 
        
    if totneg==totpos:
        output.write("-")
output.close()
testset.close()

