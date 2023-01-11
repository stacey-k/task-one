const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();


describe("Blog test suite", () => {
    let baseUrl = "https://jsonplaceholder.typicode.com";

  it("can create a new blog post and verify status is 201",function(done){
        let uri = "/posts";
        let testData = {
            'title': 'New Blog Post',
            'body': 'Bloggity bloggity boo',
            'userId':'1'
          }
        chai.use(chaiHttp);
        chai.request(baseUrl)
        .post(uri)
        .send(testData)
        .end((error, response) => {
            if(error){
                console.log(error);
            }else{
                expect(response).to.have.status(201);
                expect(response.body).to.have.property('id', 101);
                
            }
            })
        done();
    })

    it("can update an existing blog post and verify status is 200",function(done){
        let uri = "/posts/1";
        let testData = {
                'id': 1,
                'title': 'Updated Blog Title',
                'body': 'Updated blog post',
                'userId': 1
          }
        chai.use(chaiHttp);
        chai.request(baseUrl)
        .put(uri)
        .send(testData)
        .end((error, response) => {
            if(error){
                console.log(error);
            }else{
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('id', 1);
                expect(response.body).to.have.property('title', 'Updated Blog Title');
                expect(response.body).to.have.property('body', 'Updated blog post');
                
            }
            })
        done();
    })

    it("can delete an existing blog post and verify status is 200",function(done){
        let uri = "/posts/2";
        chai.use(chaiHttp);
        chai.request(baseUrl)
        .delete(uri)
        .end((error, response) => {
            if(error){
                console.log(error);
            }else{
                expect(response).to.have.status(200);
                expect(response.body).to.be.empty;
            }
            })
        done();
    })
        



    it("can retrieve all blog posts. Validate all posts have a userId, body, id and title and the status is 200", function(done) {
        let uri = "/posts";
        chai.use(chaiHttp);
        chai.request(baseUrl)
        .get(uri)
        .end((error, response) => {
            if(error){
                console.log(error);
            }else{
                expect(response).to.have.status(200);
                response.body.every(i => expect(i).to.have.all.keys('body', 'id', 'title', 'userId'));
            }
            done();
            })
    })

    it("can retrieve all blog posts filtered by a specific user and verify status is 200", function(done) {
        let testUserId = "userId=1";
        let uri = "/posts?"+ testUserId;
        chai.use(chaiHttp);
        chai.request(baseUrl)
        .get(uri)
        .end((error, response) => {
            if(error){
                console.log(error);
            }else{
                expect(response).to.have.status(200);
                response.body.every(i => expect(i).to.have.all.keys('body', 'id', 'title', 'userId'));
                response.body.every(i => expect(i).to.have.property('userId', 1));
            }
            done();
            })
    })

    it("can retrieve an blog posts. Validate content of blog post and the status is 200", function(done) {
        let uri = "/posts/1";
            let testData = {
                userId: 1,
                id: 1,
                title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            }
        chai.use(chaiHttp);
        chai.request(baseUrl)
        .get(uri)
        .end((error, response) => {
            if(error){
                console.log(error);
            }else{
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('id',1);
                expect(response.body).to.have.property('userId', testData.userId);
                expect(response.body).to.have.property('title', testData.title);
                expect(response.body).to.have.property('body', testData.body);
            }
            done();
            })
    })
            
})