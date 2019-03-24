from train import getwords, poswords, negwords 


testset= open('F:/ifa/NaiveBayes/review.txt', 'r')
testset.readline()           

output = open("F:/ifa/NaiveBayes/output.txt", 'w')

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
        
    print("hello")
    if totneg>totpos: 

        output.write("-1")
     
    if totneg<totpos: 
        output.write("1") 
        
    if totneg==totpos:
        output.write("1")
testset.close()
output.close()

