// Simulating data fetching functions
function fetchUserProfile(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = Math.random() < 0.9;
            if (success) {
                resolve({ id: userId, name: "John Doe" });
            } else {
                reject("Failed to fetch user profile.");
            }
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = Math.random() < 0.9;
            if (success) {
                resolve([
                    { id: 1, userId, title: "First Post" },
                    { id: 2, userId, title: "Second Post" }
                ]);
            } else {
                reject("Failed to fetch user posts.");
            }
        }, 1500);
    });
}

function fetchComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = Math.random() < 0.9;
            if (success) {
                resolve([
                    { id: 1, postId, text: "Great post!" },
                    { id: 2, postId, text: "Very informative." }
                ]);
            } else {
                reject(`Failed to fetch comments for post ${postId}.`);
            }
        }, 2000);
    });
}

// Sequential fetching using Promise Chaining
function getUserContentSequential(userId) {
    console.log("Fetching user profile...");
    fetchUserProfile(userId)
        .then(user => {
            console.log("User profile retrieved:", user);
            console.log("Fetching user posts...");
            return fetchUserPosts(user.id);
        })
        .then(posts => {
            console.log("User posts retrieved:", posts);
            let commentsPromises = posts.map(post => fetchComments(post.id));
            return Promise.all(commentsPromises);
        })
        .then(comments => {
            console.log("Comments retrieved:", comments);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Async/Await with Error Handling
async function getUserContentAsync(userId) {
    try {
        console.log("Fetching user profile...");
        const user = await fetchUserProfile(userId);
        console.log("User profile retrieved:", user);
        
        console.log("Fetching user posts...");
        const posts = await fetchUserPosts(user.id);
        console.log("User posts retrieved:", posts);
        
        for (const post of posts) {
            console.log(`Fetching comments for post ${post.id}...`);
            const comments = await fetchComments(post.id);
            console.log(`Comments for post ${post.id} retrieved:`, comments);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Delayed Execution Simulation
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function executeTasks() {
    console.log('Task 1: Start');
    await delay(1000);
    console.log('Task 1: End');
    
    console.log('Task 2: Start');
    await delay(2000);
    console.log('Task 2: End');
}

// Execute the functions
getUserContentSequential(1);
setTimeout(() => getUserContentAsync(1), 3000);
setTimeout(() => executeTasks(), 6000);
