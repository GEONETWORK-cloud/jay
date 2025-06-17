// Add these at the very top of the file, right after your imports/configurations
const defaultProjectImage = 'webdev.gif';

// Initialize Firebase references
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Initialize global variables
window.projectTags = [];
window.activityTags = [];
window.activityImageLinks = [];
window.musicTags = [];  // Add this for music tags

// Make removeTag function globally available
window.removeTag = function(index) {
    if (!Array.isArray(window.projectTags)) {
        console.error('projectTags is not an array:', window.projectTags);
        return;
    }
    
    if (index < 0 || index >= window.projectTags.length) {
        console.error('Invalid tag index:', index);
        return;
    }
    
    const removedTag = window.projectTags[index];
    window.projectTags.splice(index, 1);
    updateTagList();
    showNotification(`Tag "${removedTag.name}" removed`, 'info');
};

// Make removeEditTag function globally available for edit mode
window.removeEditTag = function(index) {
    // Initialize editProjectTags if it doesn't exist
    if (!window.editProjectTags) {
        window.editProjectTags = [];
    }
    
    if (!Array.isArray(window.editProjectTags)) {
        console.error('editProjectTags is not an array:', window.editProjectTags);
        return;
    }
    
    if (index < 0 || index >= window.editProjectTags.length) {
        console.error('Invalid tag index:', index);
        return;
    }
    
    const removedTag = window.editProjectTags[index];
    window.editProjectTags.splice(index, 1);
    updateEditTagList();
    showNotification(`Tag "${removedTag.name}" removed`, 'info');
};

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form elements
    const projectForm = document.getElementById('projectForm');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const projectList = document.getElementById('projectList');
    
    // Initialize tag elements
    const tagList = document.getElementById('tagList');
    const tagName = document.getElementById('tagName');
    const tagColor = document.getElementById('tagColor');
    const addTagBtn = document.getElementById('addTagBtn');
    
    console.log('Tag Elements:', { tagList, tagName, tagColor, addTagBtn });
    
    // Add click handlers for all sidebar links
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', async (e) => {
            // If it's a direct href link (not '#'), let it proceed
            if (link.getAttribute('href') && link.getAttribute('href') !== '#') {
                return; // This will allow the normal link behavior
            }

            // Otherwise handle dashboard sections
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });

    // Project form submission handler
    if (projectForm) {
        projectForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const user = auth.currentUser;
                if (!user) {
                    showNotification('Please log in to create content', 'error');
                    return;
                }

                // Get form elements
                const titleInput = document.getElementById('title');
                const descriptionInput = document.getElementById('description');
                const projectLinkInput = document.getElementById('projectLink');
                const liveLinkInput = document.getElementById('liveLink'); // Add this line
                const categoryInput = document.getElementById('projectCategory');
                const imageInput = document.getElementById('imageUpload');
                
                // Check if all required elements exist
                if (!titleInput || !descriptionInput || !projectLinkInput || !liveLinkInput || !categoryInput || !imageInput) {
                    showNotification('Form elements not found', 'error');
                    return;
                }

                const formData = {
                    title: titleInput.value,
                    description: descriptionInput.value,
                    projectLink: projectLinkInput.value,
                    liveLink: liveLinkInput.value, // Add this line
                    category: categoryInput.value,
                    imageUrl: imageInput.value.trim(),
                    tags: window.projectTags || [],
                    userId: user.uid,
                    userName: user.displayName || user.email.split('@')[0],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };

                console.log('Submitting project:', formData);
                await db.collection('projects').add(formData);
                
                showNotification('Project created successfully!', 'success');
                
                // Reset form and tags
                projectForm.reset();
                window.projectTags = [];
                updateTagList();
                
                if (imagePreview) {
                    imagePreview.style.backgroundImage = '';
                    imagePreview.textContent = 'PREVIEW';
                    imagePreview.classList.remove('has-image');
                }
                
                // Redirect to projects list
                document.querySelectorAll('main > section').forEach(section => {
                    section.style.display = 'none';
                });
                const projectsSection = document.getElementById('projectsSection');
                if (projectsSection) {
                    projectsSection.style.display = 'block';
                    await loadProjects();
                }
            } catch (error) {
                console.error('Error creating project:', error);
                showNotification('Error creating project: ' + error.message, 'error');
            }
        });
    }

    // Tag handling
    if (addTagBtn && tagName && tagColor) {
        addTagBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add tag button clicked');
            
            let name = tagName.value.trim();
            const color = tagColor.value;
            
            if (!name) {
                showNotification('Please enter a tag name', 'warning');
                return;
            }
            
            // Check for duplicate tags
            if (window.projectTags.some(tag => tag.name.toLowerCase() === name.toLowerCase())) {
                showNotification('Tag already exists', 'warning');
                return;
            }
            
            window.projectTags.push({
                name: name,
                color: color
            });
            
            console.log('Current tags:', window.projectTags);
            updateTagList();
            tagName.value = '';
            showNotification(`Tag "${name}" added successfully`, 'success');
        });
    }

    // Function to update tag list display
    function updateTagList() {
        if (!tagList) {
            console.error('Tag list element not found!');
            return;
        }
        
        tagList.innerHTML = window.projectTags.map((tag, index) => `
            <span class="tag" style="background-color: ${tag.color}">
                ${tag.name}
                <button type="button" class="remove-tag" onclick="removeTag(${index})">×</button>
            </span>
        `).join('');
    }

    // Function to update edit tag list display
    window.updateEditTagList = function() {
        const editTagList = document.getElementById('editTagList');
        if (!editTagList) {
            console.error('Edit tag list element not found!');
            return;
        }
        
        // Initialize editProjectTags if it doesn't exist
        if (!window.editProjectTags) {
            window.editProjectTags = [];
        }
        
        editTagList.innerHTML = window.editProjectTags.map((tag, index) => `
            <span class="tag" style="background-color: ${tag.color}">
                ${tag.name}
                <button type="button" class="remove-tag" onclick="removeEditTag(${index})">×</button>
            </span>
        `).join('');
    };

    // Make removeTag function global
    function removeTag(index) {
        if (!Array.isArray(window.projectTags)) {
            console.error('projectTags is not an array:', window.projectTags);
            return;
        }
        
        if (index < 0 || index >= window.projectTags.length) {
            console.error('Invalid tag index:', index);
            return;
        }
        
        const removedTag = window.projectTags[index];
        window.projectTags.splice(index, 1);
        updateTagList();
        showNotification(`Tag "${removedTag.name}" removed`, 'info');
    }

    // Existing code...

    // Activity form elements
    const activityForm = document.getElementById('activityForm');
    const addImageLinkBtn = document.getElementById('addImageLinkBtn');
    const addActivityTagBtn = document.getElementById('addActivityTagBtn');
    
    // Add image link handler
    if (addImageLinkBtn) {
        addImageLinkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const imageLink = document.getElementById('newImageLink').value.trim();
            
            if (!imageLink) {
                showNotification('Please enter an image link', 'warning');
                return;
            }
            
            window.activityImageLinks.push(imageLink);
            updateImageLinksList();
            document.getElementById('newImageLink').value = '';
            showNotification('Image link added successfully', 'success');
        });
    }
    
    // Add activity tag handler
    if (addActivityTagBtn) {
        addActivityTagBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const name = document.getElementById('activityTagName').value.trim();
            const color = document.getElementById('activityTagColor').value;
            
            if (!name) {
                showNotification('Please enter a tag name', 'warning');
                return;
            }
            
            if (window.activityTags.some(tag => tag.name.toLowerCase() === name.toLowerCase())) {
                showNotification('Tag already exists', 'warning');
                return;
            }
            
            window.activityTags.push({ name, color });
            updateActivityTagList();
            document.getElementById('activityTagName').value = '';
            showNotification(`Tag "${name}" added successfully`, 'success');
        });
    }
    
    // Activity form submission
    if (activityForm) {
        activityForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const user = auth.currentUser;
                if (!user) {
                    showNotification('Please log in to create an activity', 'error');
                    return;
                }
                
                const formData = {
                    title: document.getElementById('activityTitle').value,
                    description: document.getElementById('activityDescription').value,
                    imageLinks: window.activityImageLinks,
                    tags: window.activityTags,
                    userId: user.uid,
                    userName: user.displayName || user.email.split('@')[0],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };
                
                await db.collection('activities').add(formData);
                showNotification('Activity created successfully!', 'success');
                
                // Reset form
                activityForm.reset();
                window.activityTags = [];
                window.activityImageLinks = [];
                updateActivityTagList();
                updateImageLinksList();
                
                // Redirect to activities list
                document.querySelectorAll('main > section').forEach(section => {
                    section.style.display = 'none';
                });
                const activitiesSection = document.getElementById('activitiesSection');
                if (activitiesSection) {
                    activitiesSection.style.display = 'block';
                }
            } catch (error) {
                console.error('Error creating activity:', error);
                showNotification('Error creating activity: ' + error.message, 'error');
            }
        });
    }
    
    // Helper functions for activity management
    function updateActivityTagList() {
        const activityTagList = document.getElementById('activityTagList');
        if (!activityTagList) return;
        
        activityTagList.innerHTML = window.activityTags.map((tag, index) => `
            <span class="tag" style="background-color: ${tag.color}">
                ${tag.name}
                <button type="button" class="remove-tag" onclick="removeActivityTag(${index})">×</button>
            </span>
        `).join('');
    }
    
    function updateImageLinksList() {
        const imageLinksContainer = document.getElementById('imageLinksContainer');
        if (!imageLinksContainer) return;
        
        imageLinksContainer.innerHTML = window.activityImageLinks.map((link, index) => `
            <div class="image-link-item">
                <img src="${link}" alt="Activity image ${index + 1}" onerror="this.src='${defaultProjectImage}'">
                <span>${link}</span>
                <button type="button" class="remove-link" onclick="removeImageLink(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Make remove functions globally available
    window.removeActivityTag = function(index) {
        window.activityTags.splice(index, 1);
        updateActivityTagList();
        showNotification('Tag removed', 'info');
    };
    
    window.removeImageLink = function(index) {
        window.activityImageLinks.splice(index, 1);
        updateImageLinksList();
        showNotification('Image link removed', 'info');
    };
});

// Add this near the top of your dashboard.js file
window.activityTags = []; // Global array for activity tags
window.activityImageLinks = []; // Global array for activity image links

// Add this function at the top level of your file
function destroyExistingChart() {
    if (window.dashboardChart) {
        window.dashboardChart.destroy();
        window.dashboardChart = null;
    }
}

console.log('Tag elements:', {
    tagList: document.getElementById('tagList'),
    tagName: document.getElementById('tagName'),
    tagColor: document.getElementById('tagColor'),
    addTagBtn: document.getElementById('addTagBtn')
});

const logoutBtn = document.getElementById('logoutBtn');
const usernameElement = document.getElementById('username');
const emailElement = document.getElementById('email');
const themeSelect = document.getElementById('themeSelect');
const notificationToggle = document.getElementById('notificationToggle');
const privacySelect = document.getElementById('privacySelect');
const currentTheme = document.getElementById('currentTheme');
const notificationStatus = document.getElementById('notificationStatus');
const currentPrivacy = document.getElementById('currentPrivacy');
const settingsUsername = document.getElementById('settingsUsername');
const currentUsername = document.getElementById('currentUsername');
const settingsEmail = document.getElementById('settingsEmail');
const soundToggle = document.getElementById('soundToggle');
const soundStatus = document.getElementById('soundStatus');

// Add this at the top level of your file, outside any other functions
let activitiesInitialized = false;

// Add this at the top of your dashboard.js file
if (!firebase.apps.length) {
    console.error('Firebase not initialized');
} else {
    console.log('Firebase initialized successfully');
    const db = firebase.firestore();
}

// Consolidated function to initialize all activities-related functionality
function initializeActivities() {
    if (activitiesInitialized) return;
    console.log('Initializing activities functionality');

    // Remove any existing event listeners
    const activitiesLink = document.querySelector('.sidebar a[data-section="activities"]');
    const newActivitiesLink = activitiesLink.cloneNode(true);
    activitiesLink.parentNode.replaceChild(newActivitiesLink, activitiesLink);

    // Add the click handler
    newActivitiesLink.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('Activities link clicked');
        
        try {
            const user = auth.currentUser;
            console.log('Current user:', user?.uid);
            
            if (!user) {
                console.error('No user logged in');
                showNotification('Please log in to view activities', 'error');
                return;
            }

            // Hide all sections
            document.querySelectorAll('main > section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show activities section
            const activitiesSection = document.getElementById('activitiesSection');
            if (!activitiesSection) {
                console.error('Activities section not found');
                return;
            }
            
            activitiesSection.style.display = 'block';
            
            // Load activities
            await loadActivities();
            
        } catch (error) {
            console.error('Error in activities click handler:', error);
            showNotification('Error loading activities section', 'error');
        }
    });

    activitiesInitialized = true;
}

// Keep only ONE auth.onAuthStateChanged at the top level
auth.onAuthStateChanged((user) => {
    if (user) {
        emailElement.textContent = user.email;
        loadUserData(user.uid);
        
        // Initialize music functionality ONCE
        initializeMusicFunctionality();
        
        // Show profile section by default
        document.querySelectorAll('main > section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById('profileSection').style.display = 'block';
        
        // Update sidebar active state
        document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
        document.querySelector('.sidebar a[data-section="profile"]')?.parentElement?.classList.add('active');
        
        // Load initial data
        loadProjects();
        updateDashboardStats();
        updateMusicStats(); // Add this line
    } else {
        window.location.href = 'login.php';
    }
});

// Add this to your existing user info loading code
function updateEmailDisplay(email, isPrivate) {
    const emailElements = document.querySelectorAll('.email');
    emailElements.forEach(element => {
        if (isPrivate) {
            const [username, domain] = email.split('@');
            element.textContent = `${username[0]}${'*'.repeat(username.length - 1)}@${domain}`;
        } else {
            element.textContent = email;
        }
    });
}

// Modify the loadUserData function
async function loadUserData(userId) {
    try {
        const doc = await db.collection('users').doc(userId).get();
        if (doc.exists) {
            const userData = doc.data();
            
            // Update username
            const username = userData.username || 'USERNAME';
            usernameElement.textContent = username;
            if (settingsUsername) {
                settingsUsername.value = username;
                currentUsername.textContent = username;
            }

            // Update email with privacy setting
            const email = auth.currentUser.email;
            const isEmailPrivate = userData.emailPrivacy || false;
            updateEmailDisplay(email, isEmailPrivate);
            
            if (settingsEmail) {
                settingsEmail.textContent = isEmailPrivate ? 
                    email.replace(/(.+)@/, '*****@') : 
                    email;
            }

            // Add email privacy toggle to settings
            if (document.getElementById('emailPrivacyToggle')) {
                document.getElementById('emailPrivacyToggle').checked = isEmailPrivate;
            }

            // Update theme
            if (themeSelect && currentTheme) {
                const theme = userData.theme || 'light';
                themeSelect.value = theme;
                currentTheme.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
                applyTheme(theme);
            }

            // Update notifications
            if (notificationToggle && notificationStatus) {
                const notifications = userData.notifications || false;
                notificationToggle.checked = notifications;
                notificationStatus.textContent = notifications ? 'Enabled' : 'Disabled';
            }

            // Update privacy
            if (privacySelect && currentPrivacy) {
                const privacy = userData.privacy || 'public';
                privacySelect.value = privacy;
                currentPrivacy.textContent = privacy.charAt(0).toUpperCase() + privacy.slice(1);
            }

            // Load analytics
            // await viewAnalytics();
        } else {
            // Initialize default settings if user data doesn't exist
            await db.collection('users').doc(userId).set({
                username: 'USERNAME',
                theme: 'light',
                notifications: false,
                privacy: 'public'
            });
            
            // Set default values in the UI
            if (settingsUsername) settingsUsername.value = 'USERNAME';
            if (currentUsername) currentUsername.textContent = 'USERNAME';
            if (themeSelect) themeSelect.value = 'light';
            if (currentTheme) currentTheme.textContent = 'Light';
            if (notificationToggle) notificationToggle.checked = false;
            if (notificationStatus) notificationStatus.textContent = 'Disabled';
            if (privacySelect) privacySelect.value = 'public';
            if (currentPrivacy) currentPrivacy.textContent = 'Public';
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        alert('Error loading user settings. Please refresh the page.');
    }
}

async function viewAnalytics() {
    try {
        // Get all projects
        const projectsSnapshot = await db.collection('projects')
            .orderBy('createdAt', 'desc')
            .get();

        // Get all activities
        const activitiesSnapshot = await db.collection('activities')
            .orderBy('timestamp', 'desc')
            .get();

        // Calculate stats
        const stats = {
            totalProjects: projectsSnapshot.size,
            totalActivities: activitiesSnapshot.size,
            latestProject: 'None',
            latestActivity: 'None'
        };

        // Get latest project
        if (!projectsSnapshot.empty) {
            const latestProject = projectsSnapshot.docs[0].data();
            stats.latestProject = latestProject.title;
        }

        // Get latest activity
        if (!activitiesSnapshot.empty) {
            const latestActivity = activitiesSnapshot.docs[0].data();
            stats.latestActivity = latestActivity.description;
        }

        // Update UI
        document.getElementById('projectCount').textContent = stats.totalProjects;
        document.getElementById('activityCount').textContent = stats.totalActivities;
        document.getElementById('latestProject').textContent = stats.latestProject;
        document.getElementById('latestActivity').textContent = stats.latestActivity;

        // Update Activity Overview
        updateActivityOverview(activitiesSnapshot.docs);

    } catch (error) {
        console.error('Error viewing analytics:', error);
        showNotification('Failed to fetch analytics', 'error');
    }
}

usernameElement.addEventListener('blur', async () => {
    const newUsername = usernameElement.textContent.trim();
    if (newUsername && newUsername !== 'USERNAME') {
        try {
            const user = auth.currentUser;
            await db.collection('users').doc(user.uid).update({
                username: newUsername
            });
        } catch (error) {
            console.error('Error updating username:', error);
            alert('Error updating username. Please try again.');
        }
    }
});

logoutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
        // The auth state listener will handle the redirect
    } catch (error) {
        showNotification('Error signing out. Please try again.', 'error');
    }
});

function getCategoryDisplayName(category) {
    const categoryInfo = {
        webdev: {
            name: 'Web Development',
            icon: 'fas fa-globe'
        },
        gamedev: {
            name: 'Game Development',
            icon: 'fas fa-gamepad'
        },
        others: {
            name: 'Other',
            icon: 'fas fa-folder'
        }
    };
    return categoryInfo[category] || categoryInfo.others;
}

// Add this helper function to create category sections
function createCategorySection(category, projects) {
    const categorySection = document.createElement('div');
    categorySection.className = 'category-section';
    
    const categoryInfo = getCategoryDisplayName(category);
    
    categorySection.innerHTML = `
        <div class="category-header">
            <div class="category-title">
                <i class="${categoryInfo.icon}"></i>
                ${categoryInfo.name}
            </div>
        </div>
        <div class="project-grid">
            <div class="scroll-indicator scroll-left" onclick="scrollProjects(this.parentElement, -1)">
                <i class="fas fa-chevron-left"></i>
            </div>
            <div class="project-container">
                ${projects.map(project => createProjectCard(project).outerHTML).join('')}
            </div>
            <div class="scroll-indicator scroll-right" onclick="scrollProjects(this.parentElement, 1)">
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    `;

    return categorySection;
}

function scrollProjects(container, direction) {
    const projectContainer = container.querySelector('.project-container');
    const scrollAmount = 280 + 16; // card width + gap
    
    projectContainer.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Update the loadProjects function
async function loadProjects() {
    try {
        const projectList = document.getElementById('projectList');
        if (!projectList) return;

        projectList.innerHTML = '<div class="loading">Loading projects...</div>';

        // Get all projects without user filtering
        const snapshot = await db.collection('projects')
            .orderBy('createdAt', 'desc')
            .get();

        projectList.innerHTML = '';

        if (snapshot.empty) {
            projectList.innerHTML = '<div class="no-content">No projects available</div>';
            return;
        }

        // Group projects by category
        const projectsByCategory = {
            others: [],    // Changed order to match desired display
            webdev: [],
            gamedev: []
        };

        // Sort projects into categories and fetch uploader info
        for (const doc of snapshot.docs) {
            const project = { ...doc.data(), id: doc.id };
            const category = project.category || 'others';
            
            try {
                const uploaderDoc = await db.collection('users').doc(project.userId).get();
                project.uploaderInfo = {
                    username: uploaderDoc.exists ? uploaderDoc.data().username : 'Unknown User',
                    email: uploaderDoc.exists ? uploaderDoc.data().email : 'No email'
                };
            } catch (error) {
                console.error('Error fetching uploader info:', error);
                project.uploaderInfo = {
                    username: 'Unknown User',
                    email: 'No email'
                };
            }
            
            if (projectsByCategory.hasOwnProperty(category)) {
                projectsByCategory[category].push(project);
            } else {
                projectsByCategory.others.push(project);
            }
        }

        // Create sections in specific order
        const categoryOrder = ['others', 'webdev', 'gamedev'];
        categoryOrder.forEach(category => {
            const projects = projectsByCategory[category];
            if (projects && projects.length > 0) {
                const categorySection = createCategorySection(category, projects);
                projectList.appendChild(categorySection);
            }
        });

        showNotification('Projects loaded successfully', 'success');
    } catch (error) {
        console.error('Error loading projects:', error);
        showNotification('Error loading projects', 'error');
        projectList.innerHTML = '<div class="error-message">Error loading projects</div>';
    }
}

// Update the sidebar click handler
document.querySelectorAll('.sidebar a').forEach(link => {
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    
    newLink.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const sectionId = e.target.closest('a')?.getAttribute('data-section');
            if (!sectionId) return;

            // Hide all sections
            document.querySelectorAll('main > section').forEach(section => {
                section.style.display = 'none';
            });

            // Show selected section
            const selectedSection = document.getElementById(`${sectionId}Section`);
            if (!selectedSection) {
                console.error(`Section not found: ${sectionId}Section`);
                return;
            }

            selectedSection.style.display = 'block';
            
            // Handle specific section loads
            switch(sectionId) {
                case 'musicList':
                    await loadMusicList();
                    break;
                case 'addMusic':
                    console.log('Initializing add music form...');
                    const musicForm = document.getElementById('musicForm');
                    if (musicForm) {
                        musicForm.reset();
                        window.musicTags = []; // Reset tags
                        updateMusicTagList();
                        const submitBtn = musicForm.querySelector('button[type="submit"]');
                        if (submitBtn) {
                            submitBtn.textContent = 'ADD TO MUSIC LIST';
                        }
                    }
                    break;
                case 'partnershipList':
                    console.log('Loading partnership list...');
                    await loadPartnerships();
                    break;
                case 'partnership':
                    console.log('Initializing partnership form...');
                    initializePartnership();
                    break;
                case 'projects':
                    await loadProjects();
                    break;
                case 'activities':
                    await loadActivities();
                    break;
            }

            // Update active state
            document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
            e.target.closest('li').classList.add('active');

        } catch (error) {
            console.error('Error handling section change:', error);
            showNotification('Error switching sections', 'error');
        }
    });
});

// Update the createProjectCard to show uploader info and admin controls
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.imageUrl || defaultProjectImage}" 
                 alt="${project.title}" 
                 onerror="this.src='${defaultProjectImage}'">
        </div>
        <div class="project-content">
            <div class="project-header">
                <h3 class="project-title">${project.title || 'Untitled Project'}</h3>
                <div class="project-meta">
                    <span class="project-uploader">
                        <i class="fas fa-user"></i> 
                        ${project.uploaderInfo.username}
                        <span class="uploader-email">${project.uploaderInfo.email}</span>
                    </span>
                    <span class="project-date">
                        <i class="far fa-calendar-alt"></i> ${formatDate(project.createdAt)}
                    </span>
                </div>
            </div>
            
            <div class="project-body">
                <p class="project-description">${project.description || 'No description available'}</p>
                <div class="project-tags-display">
                    ${project.tags?.map(tag => `
                        <span class="tag" style="background-color: ${tag.color}">
                            ${tag.name}
                        </span>
                    `).join('') || '<span class="no-tags">No tags</span>'}
                </div>
            </div>

            <div class="project-actions">
                <div class="button-group">
                    ${project.projectLink ? `
                        <button onclick="window.open('${project.projectLink}', '_blank')" class="view-project-btn">
                            <i class="fas fa-code"></i>
                            View Source
                        </button>
                        <button onclick="editProject('${project.id}')" class="quick-action-btn edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                    ` : '<button class="view-project-btn disabled" disabled>No source available</button>'}
                </div>
                
                <div class="button-group">
                    ${project.liveLink ? `
                        <button onclick="window.open('${project.liveLink}', '_blank')" class="view-live-btn">
                            <i class="fas fa-globe"></i>
                            View Live
                        </button>
                        <button onclick="deleteProject('${project.id}')" class="quick-action-btn delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    return card;
}

// Confirmation Dialog Function
function showConfirmDialog(title, message) {
    return new Promise((resolve) => {
        const dialog = document.getElementById('confirmDialog');
        const titleEl = document.getElementById('confirmTitle');
        const messageEl = document.getElementById('confirmMessage');
        const cancelBtn = document.getElementById('confirmCancel');
        const okBtn = document.getElementById('confirmOk');

        titleEl.textContent = title;
        messageEl.textContent = message;

        dialog.classList.add('show');

        const handleCancel = () => {
            dialog.classList.remove('show');
            resolve(false);
        };

        const handleOk = () => {
            dialog.classList.remove('show');
            resolve(true);
        };

        cancelBtn.onclick = handleCancel;
        okBtn.onclick = handleOk;
    });
}

// Update the delete project function to use the new confirmation dialog
async function deleteProject(projectId, imageUrl) {
    const confirmed = await showConfirmDialog(
        "Delete Project",
        "Are you sure you want to delete this project? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
        showNotification('Deleting project...', 'info');
        
        await db.collection('projects').doc(projectId).delete();

        if (imageUrl) {
            const storageRef = storage.refFromURL(imageUrl);
            await storageRef.delete();
        }

        showNotification('Project deleted successfully!', 'success');
        loadProjects();
    } catch (error) {
        console.error('Error deleting project:', error);
        showNotification('Error deleting project. Please try again.', 'error');
    }
}

const editProfileBtn = document.getElementById('editProfileBtn');
const changePasswordBtn = document.getElementById('changePasswordBtn');
const viewAnalyticsBtn = document.getElementById('viewAnalyticsBtn');
const dashboardUsername = document.getElementById('username');
const dashboardEmail = document.getElementById('dashboardEmail');
const activityList = document.getElementById('activityList');

// Load user details in the profile section
auth.onAuthStateChanged((user) => {
    if (user) {
        dashboardUsername.textContent = user.displayName || 'USERNAME';
        dashboardEmail.textContent = user.email;

        // Load recent activity (placeholder)
        loadRecentActivity(user.uid);
    }
});

// Update the loadRecentActivity function
async function loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    if (!activityList) {
        console.error('Activity list element not found');
        return;
    }

    try {
        console.log('Loading recent activities...');
        activityList.innerHTML = '<div class="loading">Loading recent activities...</div>';

        const user = auth.currentUser;
        if (!user) {
            console.error('No user logged in');
            return;
        }

        // Fetch both projects and activities
        const [projectsSnapshot, activitiesSnapshot] = await Promise.all([
            db.collection('projects')
                .orderBy('createdAt', 'desc')
                .limit(5)
                .get(),
            db.collection('activities')
                .orderBy('createdAt', 'desc')
                .limit(5)
                .get()
        ]);

        console.log('Projects found:', projectsSnapshot.size);
        console.log('Activities found:', activitiesSnapshot.size);

        // Combine and sort activities
        const recentActions = [
            ...projectsSnapshot.docs.map(doc => ({
                type: 'project',
                title: doc.data().title,
                createdAt: doc.data().createdAt,
                userName: doc.data().userName || 'User'
            })),
            ...activitiesSnapshot.docs.map(doc => ({
                type: 'activity',
                title: doc.data().title,
                createdAt: doc.data().createdAt,
                userName: doc.data().userName || 'User'
            }))
        ].sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
        .slice(0, 5);

        console.log('Combined recent actions:', recentActions);

        if (recentActions.length === 0) {
            activityList.innerHTML = `
                <div class="activity-item no-updates">
                    <div class="activity-icon">
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-text">No updates</div>
                    </div>
                </div>`;
            return;
        }

        activityList.innerHTML = recentActions.map(action => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${action.type === 'project' ? 'fas fa-project-diagram' : 'fas fa-tasks'}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-text">
                        <span class="activity-user">@${action.userName}</span> 
                        added a new ${action.type} 
                        <span class="activity-title">"${action.title || 'Untitled'}"</span>
                    </div>
                    <div class="activity-time">
                        ${formatTimeAgo(action.createdAt?.toDate())}
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading recent activities:', error);
        activityList.innerHTML = `
            <div class="activity-item error">
                <div class="activity-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-text">Error loading activities</div>
                </div>
            </div>`;
    }
}

document.getElementById('viewAnalyticsBtn').addEventListener('click', viewAnalytics);

async function changePassword() {
    const newPassword = prompt('Enter your new password:');
    if (!newPassword) return;

    try {
        const user = auth.currentUser;
        if (user) {
            await user.updatePassword(newPassword);
            alert('Password updated successfully!');
        }
    } catch (error) {
        console.error('Error changing password:', error);
        if (error.code === 'auth/requires-recent-login') {
            alert('Please log in again to change your password.');
        } else {
            alert('Failed to change password. Please try again.');
        }
    }
}

document.getElementById('changePasswordBtn').addEventListener('click', changePassword);

async function editProfile() {
    const newUsername = prompt('Enter your new username:');
    if (!newUsername) return;

    try {
        const user = auth.currentUser;
        if (user) {
            await db.collection('users').doc(user.uid).update({
                username: newUsername,
            });
            document.getElementById('dashboardUsername').textContent = newUsername;
            alert('Profile updated successfully!');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
}

document.getElementById('editProfileBtn').addEventListener('click', editProfile);

// Replace these with actual user data fetching logic
const mockUserData = {
    username: "USERNAME", // Replace with actual username
    email: "@username@gmail.com" // Replace with actual email
};

document.addEventListener("DOMContentLoaded", () => {
    const dashboardUsername = document.getElementById("dashboardUsername");
    const dashboardEmail = document.getElementById("dashboardEmail");

    // Populate user details
    dashboardUsername.textContent = mockUserData.username;
    dashboardEmail.textContent = mockUserData.email;
});

function saveTheme() {
    const theme = themeSelect.value;
    currentTheme.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    const user = auth.currentUser;
    if (user) {
        db.collection('users').doc(user.uid)
            .update({ theme: theme })
            .then(() => {
                showNotification('Theme settings saved successfully!', 'success');
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch(error => {
                console.error('Error saving theme:', error);
                showNotification('Error saving theme settings', 'error');
            });
    }
}

function saveNotifications() {
    const notifications = notificationToggle.checked;
    notificationStatus.textContent = notifications ? 'Enabled' : 'Disabled';
    const user = auth.currentUser;
    if (user) {
        db.collection('users').doc(user.uid)
            .update({ notifications: notifications })
            .then(() => {
                showNotification('Notification settings saved successfully!', 'success');
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch(error => {
                console.error('Error saving notifications:', error);
                showNotification('Error saving notification settings', 'error');
            });
    }
}

function savePrivacy() {
    const privacy = privacySelect.value;
    currentPrivacy.textContent = privacy.charAt(0).toUpperCase() + privacy.slice(1);
    const user = auth.currentUser;
    if (user) {
        db.collection('users').doc(user.uid)
            .update({ privacy: privacy })
            .then(() => {
                showNotification('Privacy settings saved successfully!', 'success');
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch(error => {
                console.error('Error saving privacy:', error);
                showNotification('Error saving privacy settings', 'error');
            });
    }
}

function saveUsername() {
    const newUsername = settingsUsername.value;
    const user = auth.currentUser;
    if (user) {
        db.collection('users').doc(user.uid)
            .update({
                username: newUsername
            })
            .then(() => {
                currentUsername.textContent = newUsername;
                usernameElement.textContent = newUsername;
                showNotification('Username updated successfully!', 'success');
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch((error) => {
                console.error('Error updating username:', error);
                showNotification('Error updating username', 'error');
            });
    }
}

function changeEmail() {
    showContextModal('Change Email', 'Enter new email address', (newEmail) => {
        const user = auth.currentUser;
        user.updateEmail(newEmail)
            .then(() => {
                settingsEmail.textContent = newEmail;
                emailElement.textContent = newEmail;
                showNotification('Email updated successfully!', 'success');
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch((error) => {
                console.error('Error updating email:', error);
                if (error.code === 'auth/requires-recent-login') {
                    showNotification('Please log out and log in again to change your email.', 'warning');
                } else {
                    showNotification('Error updating email: ' + error.message, 'error');
                }
            });
    });
}

function changePassword() {
    showContextModal('Change Password', 'Enter new password', (newPassword) => {
        const user = auth.currentUser;
        user.updatePassword(newPassword)
            .then(() => {
                showNotification('Password updated successfully!', 'success');
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch((error) => {
                console.error('Error updating password:', error);
                if (error.code === 'auth/requires-recent-login') {
                    showNotification('Please log out and log in again to change your password.', 'warning');
                } else {
                    showNotification('Error updating password: ' + error.message, 'error');
                }
            });
    });
}

// Add event listeners for settings changes
document.addEventListener('DOMContentLoaded', function() {
    // Theme change handler
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            document.body.className = this.value + '-theme';
        });
    }

    // Notification toggle handler
    if (notificationToggle) {
        notificationToggle.addEventListener('change', function() {
            notificationStatus.textContent = this.checked ? 'Enabled' : 'Disabled';
        });
    }
});

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

if (themeSelect) {
    themeSelect.addEventListener('change', function() {
        const theme = this.value;
        applyTheme(theme);
        // Save to database
        const user = auth.currentUser;
        if (user) {
            db.collection('users').doc(user.uid)
                .update({ theme: theme })
                .then(() => {
                    currentTheme.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
                })
                .catch(error => console.error('Error saving theme:', error));
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    if (themeSelect) {
        themeSelect.value = savedTheme;
    }
});

// Add this notification system
function playNotificationSound(type) {
    const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    if (!soundEnabled) return;

    const sounds = {
        success: document.getElementById('successSound'),
        error: document.getElementById('errorSound'),
        warning: document.getElementById('warningSound'),
        info: document.getElementById('infoSound')
    };

    const sound = sounds[type];
    if (sound) {
        sound.volume = 0.5;
        sound.currentTime = 0;
        sound.play().catch(err => console.log('Sound play prevented:', err));
    }
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    container.style.display = 'flex';
    const notification = document.getElementById('notification');
    const notificationMessage = notification.querySelector('.notification-message');
    const notificationIcon = notification.querySelector('.notification-icon');
    
    notificationMessage.textContent = message;
    notificationIcon.className = `notification-icon fas fa-${
        type === 'success' ? 'check-circle' :
        type === 'error' ? 'times-circle' :
        type === 'warning' ? 'exclamation-triangle' :
        'info-circle'
    }`;
    
    notification.className = `notification ${type}`;
    
    setTimeout(() => {
        container.style.display = 'none';
    }, 3000);
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
}

// Add these functions for the context modal
function showContextModal(title, content, confirmCallback, isCustomContent = false) {
    const modal = document.getElementById('contextModal');
    const titleElement = document.getElementById('contextModalTitle');
    const modalContent = document.getElementById('contextModalContent');
    const confirmBtn = modal.querySelector('.context-confirm');
    const cancelBtn = modal.querySelector('.context-cancel');
    const closeBtn = modal.querySelector('.context-close');

    titleElement.textContent = title;
    
    // Handle content based on type
    if (isCustomContent) {
        modalContent.innerHTML = content;
    } else {
        modalContent.innerHTML = `
            <input type="text" class="context-input" placeholder="${content}" />
        `;
    }

    modal.classList.add('show');
    
    // Focus on input if it exists
    const input = modalContent.querySelector('.context-input');
    if (input) {
        input.focus();
    }

    const handleConfirm = () => {
        if (isCustomContent) {
            confirmCallback();
        } else {
            const value = input?.value.trim();
            if (value) {
                confirmCallback(value);
            }
        }
        hideContextModal();
    };

    const handleCancel = () => {
        hideContextModal();
    };

    // Remove existing event listeners
    confirmBtn.replaceWith(confirmBtn.cloneNode(true));
    cancelBtn.replaceWith(cancelBtn.cloneNode(true));
    closeBtn.replaceWith(closeBtn.cloneNode(true));

    // Add new event listeners
    modal.querySelector('.context-confirm').addEventListener('click', handleConfirm);
    modal.querySelector('.context-cancel').addEventListener('click', handleCancel);
    modal.querySelector('.context-close').addEventListener('click', handleCancel);

    // Handle keyboard events
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleConfirm();
        }
        if (e.key === 'Escape') {
            handleCancel();
        }
    });
}

function hideContextModal() {
    const modal = document.getElementById('contextModal');
    modal.classList.remove('show');
}

function saveSound() {
    const soundEnabled = soundToggle.checked;
    soundStatus.textContent = soundEnabled ? 'Enabled' : 'Disabled';
    localStorage.setItem('soundEnabled', soundEnabled);
    
    const user = auth.currentUser;
    if (user) {
        db.collection('users').doc(user.uid)
            .update({ soundEnabled: soundEnabled })
            .then(() => {
                showNotification('Sound settings saved successfully!', 'success');
            })
            .catch(error => {
                console.error('Error saving sound settings:', error);
                showNotification('Error saving sound settings', 'error');
            });
    }
}

// Add this function to animate the counters
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Reset image preview when form is reset
projectForm.addEventListener('reset', () => {
    projectTags = []; // Clear tags
    updateTagList();
    imagePreview.style.backgroundImage = '';
    imagePreview.textContent = 'PREVIEW';
    imagePreview.classList.remove('has-image');
});

// Function to create activity element
function createActivityElement(id, activity) {
    console.log('Creating activity element:', { id, activity });
    
    const div = document.createElement('div');
    div.className = 'project-card';
    
    // Create icons display from image URLs
    const iconDisplay = activity.imageUrls && activity.imageUrls.length > 0 
        ? `<div class="project-image">
            <img src="${activity.imageUrls[0]}" alt="${activity.title}" 
                 onerror="this.src='${defaultProjectImage}'">
           </div>`
        : `<div class="project-image">
            <img src="${defaultProjectImage}" alt="Default image">
           </div>`;

    div.innerHTML = `
        ${iconDisplay}
        <div class="project-content">
            <div class="project-header">
                <h3 class="project-title">${activity.title || 'Untitled Activity'}</h3>
                <div class="project-meta">
                    <span class="project-date">
                        <i class="far fa-calendar-alt"></i> 
                        ${activity.createdAt ? new Date(activity.createdAt.seconds * 1000).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : 'Date not available'}
                    </span>
                </div>
            </div>
            
            <div class="project-body">
                <p class="project-description">${activity.description || 'No description available'}</p>
                <div class="project-tags-display">
                    ${activity.tags ? activity.tags.map(tag => `
                        <span class="tag" style="background-color: ${tag.color}">
                            ${tag.name}
                        </span>
                    `).join('') : '<span class="no-tags">No tags</span>'}
                </div>
            </div>

            <div class="project-actions">
                ${auth.currentUser ? `
                    ${activity.userId === auth.currentUser.uid ? `
                        <button onclick="editActivity('${id}')" class="quick-action-btn edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                    ` : ''}
                    <button onclick="deleteActivity('${id}')" class="quick-action-btn delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    return div;
}

// Function to delete activity
async function deleteActivity(id) {
    try {
        // Check if user is logged in
        const user = auth.currentUser;
        if (!user) {
            showNotification('Please log in to delete activities', 'error');
            return;
        }

        // Show confirmation dialog
        const result = await showConfirmDialog('Delete Activity', 'Are you sure you want to delete this activity?');
        if (!result) return;

        showLoader();
        
        // Get the activity
        const doc = await db.collection('activities').doc(id).get();
        if (!doc.exists) {
            showNotification('Activity not found', 'error');
            return;
        }

        // Delete the activity without checking ownership
        await db.collection('activities').doc(id).delete();
        
        await updateDashboardStats();
        showNotification('Activity deleted successfully', 'success');
        await loadActivities();
    } catch (error) {
        console.error('Error deleting activity:', error);
        showNotification('Failed to delete activity: ' + error.message, 'error');
    } finally {
        hideLoader();
    }
}

// Function to edit activity
async function editActivity(id) {
    try {
        // First check if user is logged in
        const user = auth.currentUser;
        if (!user) {
            showNotification('Please log in to edit activities', 'error');
            return;
        }

        // Get the activity data
        const doc = await db.collection('activities').doc(id).get();
        if (!doc.exists) {
            showNotification('Activity not found', 'error');
            return;
        }

        const activity = doc.data();
        
        // Switch to activity section
        const activitySection = document.getElementById('activitySection');
        if (!activitySection) {
            showNotification('Activity section not found', 'error');
            return;
        }

        // Hide all sections and show activity section
        document.querySelectorAll('main > section').forEach(section => {
            section.style.display = 'none';
        });
        activitySection.style.display = 'block';

        // Get form elements
        const form = document.getElementById('activityForm');
        const titleInput = document.getElementById('activityTitle');
        const descriptionInput = document.getElementById('activityDescription');

        if (!form || !titleInput || !descriptionInput) {
            showNotification('Form elements not found', 'error');
            return;
        }

        // Fill form with activity data
        titleInput.value = activity.title || '';
        descriptionInput.value = activity.description || '';

        // Initialize arrays if they don't exist
        if (typeof window.activityImageLinks === 'undefined') {
            window.activityImageLinks = [];
        }
        if (typeof window.activityTags === 'undefined') {
            window.activityTags = [];
        }

        // Update arrays with activity data
        window.activityImageLinks = Array.isArray(activity.imageUrls) ? [...activity.imageUrls] : [];
        window.activityTags = Array.isArray(activity.tags) ? [...activity.tags] : [];

        // Update displays
        if (typeof window.updateImageLinksList === 'function') {
            window.updateImageLinksList();
        }
        if (typeof window.updateActivityTagList === 'function') {
            window.updateActivityTagList();
        }

        // Update form submit handler
        form.onsubmit = async (e) => {
            e.preventDefault();
            await updateActivity(id);
        };

        // Update button text
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'UPDATE ACTIVITY';
        }

        showNotification('Edit mode activated', 'info');
    } catch (error) {
        console.error('Error loading activity for edit:', error);
        showNotification('Failed to load activity for editing: ' + error.message, 'error');
    }
}

// Function to update activity
async function updateActivity(id) {
    try {
        showLoader();
        
        const title = document.getElementById('activityTitle').value;
        const description = document.getElementById('activityDescription').value;

        // Get current user
        const user = auth.currentUser;
        if (!user) {
            showNotification('Please log in to update activities', 'error');
            return;
        }

        // Update activity document
        const activityData = {
            title,
            description,
            imageUrls: [...window.activityImageLinks],  // Changed from imageUrl to imageUrls
            tags: [...window.activityTags],
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('activities').doc(id).update(activityData);

        // Reset form
        document.getElementById('activityForm').reset();
        window.activityTags = [];
        window.activityImageLinks = [];  // Clear image links
        window.updateActivityTagList();
        window.updateImageLinksList();  // Update image links display

        // Reset submit button text
        const submitButton = document.getElementById('activityForm').querySelector('button[type="submit"]');
        submitButton.textContent = 'PUBLISH ACTIVITY';

        await updateDashboardStats();
        showNotification('Activity updated successfully!', 'success');
        
        // Switch to activities section and reload
        const activitiesSection = document.getElementById('activitiesSection');
        if (activitiesSection) {
            document.querySelectorAll('main > section').forEach(section => {
                section.style.display = 'none';
            });
            activitiesSection.style.display = 'block';
            await loadActivities();
        }
    } catch (error) {
        console.error('Error updating activity:', error);
        showNotification('Failed to update activity: ' + error.message, 'error');
    } finally {
        hideLoader();
    }
}

// Make sure activities load when switching to activities section
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', async (e) => {
        const section = e.target.closest('a').getAttribute('data-section');
        if (section === 'activities') {
            // Show activities section
            document.querySelectorAll('main > section').forEach(section => {
                section.style.display = 'none';
            });
            const activitiesSection = document.getElementById('activitiesSection');
            activitiesSection.style.display = 'block';
            
            // Load activities immediately
            await loadActivities();
        }
    });
});

// Also call loadActivities when the page loads if we're on the activities section
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('activitiesSection').style.display !== 'none') {
        loadActivities();
    }
});

// Loader functions
function showLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader-overlay';
    loader.innerHTML = `
        <div class="loader">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoader() {
    const loader = document.querySelector('.loader-overlay');
    if (loader) {
        loader.remove();
    }
}

// Confirmation dialog function
async function confirmDialog(title, message) {
    return new Promise((resolve) => {
        const dialog = document.getElementById('confirmDialog');
        const titleEl = document.getElementById('confirmTitle');
        const messageEl = document.getElementById('confirmMessage');
        const cancelBtn = document.getElementById('confirmCancel');
        const okBtn = document.getElementById('confirmOk');

        // Set dialog content
        titleEl.textContent = title;
        messageEl.textContent = message;

        // Show dialog
        dialog.classList.add('show');

        // Handle button clicks
        const handleCancel = () => {
            dialog.classList.remove('show');
            resolve(false);
            cleanup();
        };

        const handleOk = () => {
            dialog.classList.remove('show');
            resolve(true);
            cleanup();
        };

        const cleanup = () => {
            cancelBtn.removeEventListener('click', handleCancel);
            okBtn.removeEventListener('click', handleOk);
        };

        // Add event listeners
        cancelBtn.addEventListener('click', handleCancel);
        okBtn.addEventListener('click', handleOk);
    });
}

// Function to load activities
async function loadActivities() {
    console.log('loadActivities called');
    const activitiesGrid = document.getElementById('activitiesGrid');
    
    if (!activitiesGrid) {
        console.error('Activities grid element not found');
        return;
    }

    try {
        activitiesGrid.innerHTML = '<div class="loading">Loading activities...</div>';

        const user = auth.currentUser;
        if (!user) {
            console.error('No user logged in');
            activitiesGrid.innerHTML = '<div class="error">Please log in to view activities</div>';
            return;
        }

        console.log('Fetching activities...');
        const snapshot = await db.collection('activities')
            .orderBy('createdAt', 'desc')
            .get();

        console.log('Activities fetched:', snapshot.size);

        if (snapshot.empty) {
            activitiesGrid.innerHTML = '<div class="no-content">No activities available yet</div>';
            return;
        }

        activitiesGrid.innerHTML = '';
        snapshot.forEach(doc => {
            const activity = doc.data();
            console.log('Processing activity:', doc.id, activity);
            const activityElement = createActivityElement(doc.id, activity);
            activitiesGrid.appendChild(activityElement);
        });

    } catch (error) {
        console.error('Error loading activities:', error);
        activitiesGrid.innerHTML = '<div class="error">Error loading activities</div>';
        showNotification('Error loading activities: ' + error.message, 'error');
    }
}

// Update the updateDashboardStats function with simplified chart creation
async function updateDashboardStats() {
    try {
        // Get existing data
        const projectsSnapshot = await db.collection('projects').get();
        const activitiesSnapshot = await db.collection('activities').get();
        const partnershipsSnapshot = await db.collection('partnerships').get();
        const musicSnapshot = await db.collection('music').get(); // Add this line

        // Update counts
        document.getElementById('projectCount').textContent = projectsSnapshot.size;
        document.getElementById('activityCount').textContent = activitiesSnapshot.size;
        document.getElementById('partnershipCount').textContent = partnershipsSnapshot.size;
        document.getElementById('totalMusic').textContent = musicSnapshot.size; // Add this line

        // Get latest items
        const latestProject = projectsSnapshot.docs[0]?.data()?.title || 'None';
        const latestActivity = activitiesSnapshot.docs[0]?.data()?.title || 'None';

        document.getElementById('latestProject').textContent = latestProject;
        document.getElementById('latestActivity').textContent = latestActivity;

        // Prepare data for the graph
        const today = new Date();
        const last7Days = Array.from({length: 7}, (_, i) => {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0];
        }).reverse();

        const activityData = {
            projects: new Array(7).fill(0),
            activities: new Array(7).fill(0),
            partnerships: new Array(7).fill(0),
            music: new Array(7).fill(0) // Add this line
        };

        // Process all data
        projectsSnapshot.forEach(doc => {
            const createdAt = doc.data().createdAt?.toDate();
            if (createdAt) {
                const dateStr = createdAt.toISOString().split('T')[0];
                const index = last7Days.indexOf(dateStr);
                if (index !== -1) {
                    activityData.projects[index]++;
                }
            }
        });

        activitiesSnapshot.forEach(doc => {
            const createdAt = doc.data().createdAt?.toDate();
            if (createdAt) {
                const dateStr = createdAt.toISOString().split('T')[0];
                const index = last7Days.indexOf(dateStr);
                if (index !== -1) {
                    activityData.activities[index]++;
                }
            }
        });

        partnershipsSnapshot.forEach(doc => {
            const createdAt = doc.data().createdAt?.toDate();
            if (createdAt) {
                const dateStr = createdAt.toISOString().split('T')[0];
                const index = last7Days.indexOf(dateStr);
                if (index !== -1) {
                    activityData.partnerships[index]++;
                }
            }
        });

        // Add music data processing
        musicSnapshot.forEach(doc => {
            const createdAt = doc.data().createdAt?.toDate();
            if (createdAt) {
                const dateStr = createdAt.toISOString().split('T')[0];
                const index = last7Days.indexOf(dateStr);
                if (index !== -1) {
                    activityData.music[index]++;
                }
            }
        });

        // Update the graph
        const ctx = document.getElementById('activityGraph').getContext('2d');
        if (window.dashboardChart) {
            window.dashboardChart.destroy();
        }

        window.dashboardChart = new Chart(ctx, {
            type: 'line',
            data: {
                // Update this line to show full date
                labels: last7Days.map(date => new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })),
                datasets: [
                    {
                        label: 'Projects',
                        data: activityData.projects,
                        borderColor: '#4318FF',
                        tension: 0.4
                    },
                    {
                        label: 'Activities',
                        data: activityData.activities,
                        borderColor: '#05CD99',
                        tension: 0.4
                    },
                    {
                        label: 'Partnerships',
                        data: activityData.partnerships,
                        borderColor: '#FFB547',
                        tension: 0.4
                    },
                    {
                        label: 'Music',
                        data: activityData.music,
                        borderColor: '#FF4842',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#A3AED0',
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(163, 174, 208, 0.1)'
                        },
                        ticks: {
                            color: '#A3AED0',
                            stepSize: 1
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(163, 174, 208, 0.1)'
                        },
                        ticks: {
                            color: '#A3AED0',
                            maxRotation: 45, // Add this to handle longer date strings
                            minRotation: 45  // Add this to handle longer date strings
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error updating dashboard stats:', error);
        showNotification('Error updating dashboard stats', 'error');
    }
}

    // Update the editProject function
    async function editProject(projectId) {
        try {
            const doc = await db.collection('projects').doc(projectId).get();
            if (!doc.exists) {
                showNotification('Project not found', 'error');
                return;
            }

            const project = doc.data();

            // Create modal content with tag management
            const modalContent = `
                <div class="edit-form">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" id="editTitle" value="${project.title || ''}" class="edit-input" placeholder="Enter title">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="editDescription" class="edit-input" placeholder="Enter description">${project.description || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Source Link</label>
                        <input type="url" id="editProjectLink" value="${project.projectLink || ''}" class="edit-input" placeholder="https://github.com/...">
                    </div>
                    <div class="form-group">
                        <label>Live Link</label>
                        <input type="url" id="editLiveLink" value="${project.liveLink || ''}" class="edit-input" placeholder="https://your-live-project.com">
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select id="editCategory" class="edit-input">
                            <option value="webdev" ${project.category === 'webdev' ? 'selected' : ''}>Web Development</option>
                            <option value="gamedev" ${project.category === 'gamedev' ? 'selected' : ''}>Game Development</option>
                            <option value="others" ${project.category === 'others' ? 'selected' : ''}>Others</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Image URL</label>
                        <input type="url" id="editImageUrl" value="${project.imageUrl || ''}" class="edit-input" placeholder="https://example.com/image.jpg">
                    </div>
                    <div class="form-group">
                        <label>Tags</label>
                        <div class="edit-tags-container">
                            <div id="editTagList" class="tag-list">
                                ${project.tags?.map(tag => `
                                    <span class="tag" style="background-color: ${tag.color}">
                                        ${tag.name}
                                        <button type="button" class="remove-tag" onclick="removeEditTag('${tag.name}')">×</button>
                                    </span>
                                `).join('') || ''}
                            </div>
                            <div class="add-tag">
                                <input type="text" id="editTagName" placeholder="Enter tag name" class="edit-input">
                                <input type="color" id="editTagColor" value="#3a7bfd">
                                <button type="button" id="addEditTagBtn" class="tag-btn">
                                    <i class="fas fa-plus"></i> Add Tag
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Show modal with the new content
            showModal('Edit Project', modalContent, async () => {
                const updatedData = {
                    title: document.getElementById('editTitle').value,
                    description: document.getElementById('editDescription').value,
                    projectLink: document.getElementById('editProjectLink').value,
                    liveLink: document.getElementById('editLiveLink').value,
                    category: document.getElementById('editCategory').value,
                    imageUrl: document.getElementById('editImageUrl').value,
                    tags: window.editProjectTags || project.tags || [],
                    lastModified: firebase.firestore.FieldValue.serverTimestamp()
                };

                await db.collection('projects').doc(projectId).update(updatedData);
                showNotification('Project updated successfully', 'success');
                loadProjects(); // Reload the projects
            });

            // Initialize edit tags array
            window.editProjectTags = [...(project.tags || [])];

            // Add tag button click handler
            const addEditTagBtn = document.getElementById('addEditTagBtn');
            if (addEditTagBtn) {
                addEditTagBtn.addEventListener('click', () => {
                    const tagName = document.getElementById('editTagName').value.trim();
                    const tagColor = document.getElementById('editTagColor').value;

                    if (tagName) {
                        window.editProjectTags = window.editProjectTags || [];
                        window.editProjectTags.push({ name: tagName, color: tagColor });
                        updateEditTagList();
                        document.getElementById('editTagName').value = '';
                    }
                });
            }

        } catch (error) {
            console.error('Error editing project:', error);
            showNotification('Error editing project', 'error');
        }
    }

    // Add these helper functions for tag management
    function updateEditTagList() {
        const tagList = document.getElementById('editTagList');
        if (!tagList) return;

        tagList.innerHTML = window.editProjectTags.map(tag => `
            <span class="tag" style="background-color: ${tag.color}">
                ${tag.name}
                <button type="button" class="remove-tag" onclick="removeEditTag('${tag.name}')">×</button>
            </span>
        `).join('');
    }

    // Make this function globally accessible
    window.removeEditTag = function(tagName) {
        window.editProjectTags = window.editProjectTags.filter(tag => tag.name !== tagName);
        updateEditTagList();
    };

    // Modal Helper Function
    function showModal(title, content, onSave) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="modal-cancel">Cancel</button>
                    <button class="modal-save">Save Changes</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('.modal-cancel');
        const saveBtn = modal.querySelector('.modal-save');

        const closeModal = () => {
            modal.remove();
        };

        closeBtn.onclick = closeModal;
        cancelBtn.onclick = closeModal;
        saveBtn.onclick = async () => {
            await onSave();
            closeModal();
        };

        // Show modal with animation
        setTimeout(() => modal.classList.add('show'), 10);
    }



    // Helper function to get activity icon
    function getActivityIcon(type) {
        const icons = {
            'create': 'fas fa-plus-circle',
            'update': 'fas fa-edit',
            'delete': 'fas fa-trash',
            'login': 'fas fa-sign-in-alt',
            'default': 'fas fa-circle'
        };
        return icons[type] || icons.default;
    }

    // Helper function to format time ago
    function formatTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, seconds] of Object.entries(intervals)) {
            const interval = Math.floor(diffInSeconds / seconds);
            if (interval >= 1) {
                return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
            }
        }

        return 'Just now';
    }

    // Add this to track activities
    async function trackActivity(type, description) {
        try {
            const user = auth.currentUser;
            if (!user) return;

            await db.collection('activities').add({
                userId: user.uid,
                type: type,
                description: description,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Error tracking activity:', error);
        }
    }

    // Update the createActivityGraph function to show both projects and activities
    function createActivityGraph(activities) {
        const canvas = document.getElementById('activityGraph');
        if (!canvas) {
            console.error('Activity graph canvas not found');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Could not get canvas context');
            return;
        }

        // Process data for the graph with formatted dates
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d;
        }).reverse();

        // Format dates for display
        const formatDate = (date) => {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        };

        // Count activities per day
        const activityCounts = last7Days.map(date => {
            return activities.filter(doc => {
                const activityDate = doc.data().timestamp?.toDate();
                return activityDate && activityDate.toDateString() === date.toDateString();
            }).length;
        });

        // Count projects per day
        const projectCounts = last7Days.map(date => {
            return projectsSnapshot.docs.filter(doc => {
                const projectDate = doc.data()?.createdAt?.toDate();
                return projectDate && projectDate.toDateString() === date.toDateString();
            }).length;
        });

        // Create or update chart
        if (window.activityChart) {
            window.activityChart.destroy();
        }

        window.activityChart = new Chart(ctx, {
            // ... rest of your chart configuration ...
        });
    }

    // Add this function to fetch total activities
    async function fetchTotalActivities() {
        try {
            // Remove user filtering to get all activities
            const activitiesRef = firebase.firestore()
                .collection('activities');

            const snapshot = await activitiesRef.get();
            const totalActivities = snapshot.size;
            
            // Update the activity count display
            const activityCountElement = document.getElementById('activityCount');
            if (activityCountElement) {
                activityCountElement.textContent = totalActivities;
            }

            return totalActivities;
        } catch (error) {
            console.error('Error fetching total activities:', error);
            showNotification('Failed to fetch total activities', 'error');
            return 0;
        }
    }

    // Add this to update activities count when new activities are added
    async function handleActivitySubmit(event) {
        event.preventDefault();
        // ... existing activity submission code ...

        // After successful activity submission
        await fetchTotalActivities(); // Update the counter
    }

    // Make sure to attach the handler to the form
    document.getElementById('activityForm').addEventListener('submit', handleActivitySubmit);

    // Add this function to handle activity tag deletion
    window.removeActivityTag = function(index) {
        console.log('Removing activity tag at index:', index);
        if (!Array.isArray(window.activityTags)) {
            window.activityTags = [];
            return;
        }
        
        window.activityTags.splice(index, 1);
        window.updateActivityTagList();
        showNotification('Tag removed successfully', 'success');
    };

    // Update the activity tag list display function with fixed delete button
    window.updateActivityTagList = function() {
        const activityTagList = document.getElementById('activityTagList');
        if (!activityTagList) {
            console.error('Activity tag list element not found');
            return;
        }

        activityTagList.innerHTML = window.activityTags.map((tag, index) => `
            <span class="tag" style="background-color: ${tag.color}">
                ${tag.name}
                <button type="button" onclick="removeActivityTag(${index})" style="background: none; border: none; color: white; cursor: pointer; padding: 0 5px;">×</button>
            </span>
        `).join('');
    };

    // Define removeActivityTag in the global scope
    function removeActivityTag(index) {
        console.log('Removing tag at index:', index);
        if (!Array.isArray(window.activityTags)) {
            window.activityTags = [];
            return;
        }
        window.activityTags.splice(index, 1);
        window.updateActivityTagList();
    }

    // Initialize activityTags array if it doesn't exist
    if (typeof window.activityTags === 'undefined') {
        window.activityTags = [];
    }

    // Make removeActivityTag globally accessible
    window.removeActivityTag = removeActivityTag;

    // Partnership handling functions
    function initializePartnership() {
        console.log('Initializing partnership functionality');
        
        const partnershipForm = document.getElementById('partnershipForm');
        if (partnershipForm) {
            console.log('Found partnership form');
            
            // Remove any existing event listeners
            const newForm = partnershipForm.cloneNode(true);
            partnershipForm.parentNode.replaceChild(newForm, partnershipForm);
            
            // Add new event listener
            newForm.addEventListener('submit', handlePartnershipSubmit);
        } else {
            console.error('Partnership form not found');
        }

        // Load partnerships if we're on the list section
        const partnershipListSection = document.getElementById('partnershipListSection');
        if (partnershipListSection && partnershipListSection.style.display !== 'none') {
            loadPartnerships();
        }
    }

    // Update the handlePartnershipSubmit function
    async function handlePartnershipSubmit(e) {
        e.preventDefault();
        
        try {
            const user = auth.currentUser;
            if (!user) {
                showNotification('Please log in to add partnerships', 'error');
                return;
            }

            const partnerData = {
                name: document.getElementById('partnerName').value,
                imageUrl: document.getElementById('partnerImageLink').value,
                website: document.getElementById('partnerWebsite').value,
                userId: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Add to Firestore
            await db.collection('partnerships').add(partnerData);
            
            // Show success notification
            showNotification('Partnership added successfully!', 'success');
            
            // Reset form
            document.getElementById('partnershipForm').reset();
            
            // Switch to partnership list view and reload
            const partnershipListSection = document.getElementById('partnershipListSection');
            if (partnershipListSection) {
                document.querySelectorAll('main > section').forEach(section => {
                    section.style.display = 'none';
                });
                partnershipListSection.style.display = 'block';
                await loadPartnerships();
            }

            // In handlePartnershipSubmit after successful addition
            await updateDashboardStats();

        } catch (error) {
            console.error('Error adding partnership:', error);
            showNotification('Error adding partnership: ' + error.message, 'error');
        }
    }

    async function loadPartnerships() {
        console.log('Loading Badges...');
        const partnershipList = document.getElementById('partnershipList');
        if (!partnershipList) {
            console.error('Partnership list container not found');
            return;
        }

        try {
            // Show loading state
            partnershipList.innerHTML = `
                <div class="loading-partnerships">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading Badges...</p>
                </div>`;

            // Get all partnerships without user filter
            console.log('Fetching all partnerships');
            const snapshot = await db.collection('partnerships')
                .orderBy('createdAt', 'desc')
                .get();
            
            console.log('Found partnerships:', snapshot.size);

            if (snapshot.empty) {
                partnershipList.innerHTML = `
                    <div class="no-partnerships">
                        <i class="fas fa-handshake"></i>
                        <p>No partnerships found</p>
                    </div>`;
                return;
            }

            // Clear and add new partnerships
            partnershipList.innerHTML = '';
            snapshot.forEach(doc => {
                const partnership = doc.data();
                console.log('Creating card for partnership:', partnership);
                const partnerCard = createPartnerCard(partnership, doc.id);
                partnershipList.appendChild(partnerCard);
            });

        } catch (error) {
            console.error('Error loading partnerships:', error);
            partnershipList.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Error loading partnerships: ${error.message}</p>
                </div>`;
            showNotification('Error loading partnerships: ' + error.message, 'error');
        }
    }

    // Update the createPartnerCard function to show delete button for all authenticated users
    function createPartnerCard(partnership, partnerId) {
        const card = document.createElement('div');
        card.className = 'partner-card';
        
        const imageUrl = partnership.imageUrl || 'default-partner-image.png';
        const user = auth.currentUser;
        const canDelete = !!user; // Show delete button for any logged-in user
        
        card.innerHTML = `
            <a href="${partnership.website}" 
               target="_blank" 
               class="partner-logo-link" 
               title="${partnership.name}">
                <img src="${imageUrl}" 
                     alt="${partnership.name}" 
                     class="partner-logo"
                     onerror="this.src='default-partner-image.png'; this.onerror=null;">
                ${canDelete ? `
                    <button onclick="event.preventDefault(); deletePartnership('${partnerId}')" 
                            class="delete-btn" 
                            title="Delete partnership">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            </a>
        `;
        return card;
    }

    // Update the deletePartnership function to allow any authenticated user to delete
    async function deletePartnership(partnerId) {
        const user = auth.currentUser;
        if (!user) {
            showNotification('Please log in to delete partnerships', 'error');
            return;
        }

        if (await confirmDialog('Delete Partnership', 'Are you sure you want to delete this partnership?')) {
            try {
                await db.collection('partnerships').doc(partnerId).delete();
                showNotification('Partnership deleted successfully!', 'success');
                loadPartnerships();

                // In deletePartnership after successful deletion
                await updateDashboardStats();

            } catch (error) {
                console.error('Error deleting partnership:', error);
                showNotification('Error deleting partnership: ' + error.message, 'error');
            }
        }
    }

    // Add this to your existing initialization code
    document.addEventListener('DOMContentLoaded', () => {
        // ... existing initialization code ...
        initializePartnership();
        initializeMusicStatsListener();
    });

    // Add these functions at the global scope
    window.deleteActivity = async function(id) {
        try {
            const result = await confirmDialog('Delete Activity', 'Are you sure you want to delete this activity?');
            if (!result) return;

            showLoader();
            
            const user = auth.currentUser;
            if (!user) {
                showNotification('Please log in to delete activities', 'error');
                return;
            }

            // Get the activity to check ownership
            const doc = await db.collection('activities').doc(id).get();
            if (!doc.exists) {
                showNotification('Activity not found', 'error');
                return;
            }

            const activity = doc.data();

            // Allow deletion for all users
            await db.collection('activities').doc(id).delete();
            
            await updateDashboardStats();
            showNotification('Activity deleted successfully', 'success');
            await loadActivities();
        } catch (error) {
            console.error('Error deleting activity:', error);
            showNotification('Failed to delete activity: ' + error.message, 'error');
        } finally {
            hideLoader();
        }
    };

    // Update loadActivities function to show delete button for all activities
    window.loadActivities = async function() {
        try {
            const activitiesGrid = document.getElementById('activitiesGrid');
            if (!activitiesGrid) return;

            const snapshot = await db.collection('activities')
                .orderBy('createdAt', 'desc')
                .get();

            activitiesGrid.innerHTML = '';

            if (snapshot.empty) {
                activitiesGrid.innerHTML = '<p class="no-activities">No activities found</p>';
                return;
            }

            snapshot.forEach(doc => {
                const activity = doc.data();
                const activityElement = document.createElement('div');
                activityElement.className = 'project-card';
                activityElement.innerHTML = `
                    <div class="project-content">
                        <h3 class="project-title">${activity.title}</h3>
                        <p class="project-description">${activity.description}</p>
                        <div class="image-slider">
                            ${activity.imageUrls?.map(url => `
                                <img src="${url}" alt="Activity image" onerror="this.src='${defaultProjectImage}'">
                            `).join('') || ''}
                        </div>
                        <div class="project-tags-display">
                            ${activity.tags?.map(tag => `
                                <span class="tag" style="background-color: ${tag.color}">${tag.name}</span>
                            `).join('') || ''}
                        </div>
                        <div class="project-actions">
                            <button onclick="editActivity('${doc.id}')" class="edit-btn">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteActivity('${doc.id}')" class="delete-btn">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                `;
                activitiesGrid.appendChild(activityElement);
            });
        } catch (error) {
            console.error('Error loading activities:', error);
            showNotification('Error loading activities', 'error');
        }
    };

    // Add these at the top level of your file with other global variables
    let musicTags = [];

    // Add music form handler
    const musicForm = document.getElementById('musicForm');
    if (musicForm) {
        musicForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                const user = auth.currentUser;
                if (!user) {
                    showNotification('Please log in to add music', 'error');
                    return;
                }

                const musicData = {
                    title: document.getElementById('musicTitle').value,
                    description: document.getElementById('musicDescription').value,
                    spotifyLink: document.getElementById('spotifyLink').value,
                    category: document.getElementById('musicCategory').value,
                    tags: [...window.musicTags], // Use window.musicTags
                    userId: user.uid,
                    userName: user.displayName || user.email.split('@')[0],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };

                await db.collection('music').add(musicData);
                
                // Reset form
                musicForm.reset();
                window.musicTags = []; // Reset tags
                updateMusicTagList();
                
                showNotification('Music added successfully!', 'success');
            } catch (error) {
                console.error('Error adding music:', error);
                showNotification('Error adding music: ' + error.message, 'error');
            }
        });
    }

    // Music tag management
    const addMusicTagBtn = document.getElementById('addMusicTagBtn');
    if (addMusicTagBtn) {
        addMusicTagBtn.addEventListener('click', () => {
            const tagName = document.getElementById('musicTagName').value.trim();
            const tagColor = document.getElementById('musicTagColor').value;
            
            if (tagName) {
                musicTags.push({ name: tagName, color: tagColor });
                updateMusicTagList();
                document.getElementById('musicTagName').value = '';
                showNotification('Tag added', 'success');
            }
        });
    }

    function updateMusicTagList() {
        const musicTagList = document.getElementById('musicTagList');
        if (!musicTagList) return;
        
        musicTagList.innerHTML = window.musicTags.map((tag, index) => `
            <span class="tag" style="background-color: ${tag.color}">
                ${tag.name}
                <button type="button" onclick="removeMusicTag(${index})" class="remove-tag">×</button>
            </span>
        `).join('');
    }

    window.removeMusicTag = function(index) {
        window.musicTags.splice(index, 1);
        updateMusicTagList();
    };

    // Load music list
    async function loadMusicList() {
        const musicGrid = document.getElementById('musicGrid');
        if (!musicGrid) return;

        try {
            musicGrid.innerHTML = '<div class="loading">Loading music list...</div>';

            const snapshot = await db.collection('music')
                .orderBy('createdAt', 'desc')
                .get();

            if (snapshot.empty) {
                musicGrid.innerHTML = '<div class="no-content">No music added yet</div>';
                return;
            }

            musicGrid.innerHTML = '';
            snapshot.forEach(doc => {
                const music = doc.data();
                const musicCard = createMusicCard(music, doc.id);
                musicGrid.appendChild(musicCard);
            });
        } catch (error) {
            console.error('Error loading music:', error);
            showNotification('Error loading music list', 'error');
        }
    }

    // Add this helper function at the top level to get username
    async function getUserDisplayName(userId) {
        try {
            const userDoc = await db.collection('users').doc(userId).get();
            if (userDoc.exists) {
                return userDoc.data().username || 'Unknown User';
            }
            return 'Unknown User';
        } catch (error) {
            console.error('Error getting username:', error);
            return 'Unknown User';
        }
    }

    // Update the createMusicCard function
    async function createMusicCard(music, musicId) {
        const card = document.createElement('div');
        card.className = 'music-card';
        
        // Get the actual username
        const displayName = await getUserDisplayName(music.userId);
        
        // Convert Spotify link to embed URL if needed
        let spotifyEmbed = music.spotifyLink;
        if (!spotifyEmbed.includes('embed')) {
            spotifyEmbed = spotifyEmbed.replace('/track/', '/embed/track/')
                .replace('/playlist/', '/embed/playlist/')
                .replace('/album/', '/embed/album/');
        }
        
        card.innerHTML = `
            <div class="music-card-content">
                <div class="music-player">
                    <iframe src="${spotifyEmbed}" 
                        width="100%" 
                        height="152" 
                        frameborder="0" 
                        allowtransparency="true" 
                        allow="encrypted-media">
                    </iframe>
                </div>
                
                <div class="music-info">
                    <div class="music-header">
                        <div class="music-category ${music.category}">
                            <i class="fas ${getCategoryIcon(music.category)}"></i>
                            ${music.category.toUpperCase()}
                        </div>
                        <div class="music-user">
                            <i class="fas fa-user-circle"></i>
                            ${displayName}
                        </div>
                    </div>
                    
                    <div class="music-date">
                        <span class="date-label">ADDED:</span>
                        <span class="date-value">${formatDate(music.createdAt)}</span>
                    </div>

                    <div class="project-tags-display">
                        ${music.tags?.map(tag => `
                            <span class="tag" style="background-color: ${tag.color}">
                                ${tag.name}
                            </span>
                        `).join('') || '<span class="no-tags">No tags</span>'}
                    </div>

                    <div class="music-actions">
                        <button onclick="editMusic('${musicId}')" class="action-btn edit" title="Edit">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button onclick="deleteMusic('${musicId}')" class="action-btn delete" title="Delete">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        return card;
    }

    // Add this helper function to format the date
    function formatDate(timestamp) {
        if (!timestamp) return 'Unknown date';
        const date = timestamp.toDate();
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Update the loadMusicList function to handle async card creation
    async function loadMusicList() {
        const musicGrid = document.getElementById('musicGrid');
        if (!musicGrid) return;

        try {
            musicGrid.innerHTML = '<div class="loading">Loading music list...</div>';

            const snapshot = await db.collection('music')
                .orderBy('createdAt', 'desc')
                .get();

            if (snapshot.empty) {
                musicGrid.innerHTML = '<div class="no-content">No music added yet</div>';
                return;
            }

            musicGrid.innerHTML = '';
            for (const doc of snapshot.docs) {
                const music = doc.data();
                const musicCard = await createMusicCard(music, doc.id);
                musicGrid.appendChild(musicCard);
            }
        } catch (error) {
            console.error('Error loading music:', error);
            showNotification('Error loading music list', 'error');
        }
    }

    // Helper function to get category icon
    function getCategoryIcon(category) {
        switch(category) {
            case 'playlist':
                return 'fa-list-music';
            case 'track':
                return 'fa-music';
            case 'album':
                return 'fa-compact-disc';
            default:
                return 'fa-music';
        }
    }

    async function deleteMusic(musicId) {
        if (await confirmDialog('Delete Music', 'Are you sure you want to delete this music item?')) {
            try {
                await db.collection('music').doc(musicId).delete();
                showNotification('Music deleted successfully', 'success');
                loadMusicList();
            } catch (error) {
                console.error('Error deleting music:', error);
                showNotification('Error deleting music', 'error');
            }
        }
    }

    // Update the editMusic function
    async function editMusic(musicId) {
        try {
            const doc = await db.collection('music').doc(musicId).get();
            if (!doc.exists) {
                showNotification('Music not found', 'error');
                return;
            }

            const music = doc.data();
            
            // Switch to add music section
            document.querySelectorAll('main > section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById('addMusicSection').style.display = 'block';
            
            // Fill form with music data
            document.getElementById('spotifyLink').value = music.spotifyLink;
            document.getElementById('musicCategory').value = music.category;
            
            // Update tags
            window.musicTags = [...(music.tags || [])];
            updateMusicTagList();
            
            // Get the form and create a new one to remove old listeners
            const oldForm = document.getElementById('musicForm');
            const newForm = oldForm.cloneNode(true);
            oldForm.parentNode.replaceChild(newForm, oldForm);
            
            // Add new submit handler for update
            newForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await updateMusic(musicId);
            });
            
            // Update button text
            newForm.querySelector('button[type="submit"]').textContent = 'UPDATE MUSIC';
            
            // Reinitialize tag button
            const addMusicTagBtn = document.getElementById('addMusicTagBtn');
            if (addMusicTagBtn) {
                const newTagBtn = addMusicTagBtn.cloneNode(true);
                addMusicTagBtn.parentNode.replaceChild(newTagBtn, addMusicTagBtn);
                
                newTagBtn.addEventListener('click', () => {
                    const tagName = document.getElementById('musicTagName').value.trim();
                    const tagColor = document.getElementById('musicTagColor').value;
                    
                    if (tagName) {
                        window.musicTags.push({ name: tagName, color: tagColor });
                        updateMusicTagList();
                        document.getElementById('musicTagName').value = '';
                        showNotification('Tag added', 'success');
                    }
                });
            }
            
        } catch (error) {
            console.error('Error editing music:', error);
            showNotification('Error editing music', 'error');
        }
    }

    // Update the updateMusic function
    async function updateMusic(musicId) {
        try {
            const musicData = {
                spotifyLink: document.getElementById('spotifyLink').value,
                category: document.getElementById('musicCategory').value,
                tags: [...window.musicTags],
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await db.collection('music').doc(musicId).update(musicData);
            
            // Reset form and tags
            const form = document.getElementById('musicForm');
            form.reset();
            window.musicTags = [];
            updateMusicTagList();
            
            // Reset button text
            form.querySelector('button[type="submit"]').textContent = 'ADD TO MUSIC LIST';
            
            showNotification('Music updated successfully', 'success');
            
            // Switch to music list and reload
            document.querySelectorAll('main > section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById('musicListSection').style.display = 'block';
            await loadMusicList();
            
            // Reinitialize the form for adding new music
            initializeMusicFunctionality();
            
        } catch (error) {
            console.error('Error updating music:', error);
            showNotification('Error updating music', 'error');
        }
    }

    // Update initializeMusicFunctionality
    function initializeMusicFunctionality() {
        const musicForm = document.getElementById('musicForm');
        if (!musicForm) return;

        // Remove any existing listeners
        const newForm = musicForm.cloneNode(true);
        musicForm.parentNode.replaceChild(newForm, musicForm);
        
        // Add the submit handler for adding new music
        newForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const user = auth.currentUser;
                if (!user) {
                    showNotification('Please log in to add music', 'error');
                    return;
                }

                const musicData = {
                    spotifyLink: document.getElementById('spotifyLink').value,
                    category: document.getElementById('musicCategory').value,
                    tags: [...window.musicTags],
                    userId: user.uid,
                    userName: user.displayName || user.email.split('@')[0],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };

                await db.collection('music').add(musicData);
                
                // Reset form
                newForm.reset();
                window.musicTags = [];
                updateMusicTagList();
                
                showNotification('Music added successfully!', 'success');
                
                // Switch to music list and reload
                document.querySelectorAll('main > section').forEach(section => {
                    section.style.display = 'none';
                });
                document.getElementById('musicListSection').style.display = 'block';
                await loadMusicList();
                
            } catch (error) {
                console.error('Error adding music:', error);
                showNotification('Error adding music: ' + error.message, 'error');
            }
        });

        // Initialize tag button
        const addMusicTagBtn = document.getElementById('addMusicTagBtn');
        if (addMusicTagBtn) {
            const newTagBtn = addMusicTagBtn.cloneNode(true);
            addMusicTagBtn.parentNode.replaceChild(newTagBtn, addMusicTagBtn);
            
            newTagBtn.addEventListener('click', () => {
                const tagName = document.getElementById('musicTagName').value.trim();
                const tagColor = document.getElementById('musicTagColor').value;
                
                if (tagName) {
                    window.musicTags.push({ name: tagName, color: tagColor });
                    updateMusicTagList();
                    document.getElementById('musicTagName').value = '';
                    showNotification('Tag added', 'success');
                }
            });
        }
    }

    // Add this function to fetch and display total music count
    async function updateMusicStats() {
        try {
            const totalMusicElement = document.getElementById('totalMusic');
            if (!totalMusicElement) return;

            const snapshot = await db.collection('music').get();
            const totalCount = snapshot.size;

            // Animate the counter
            const duration = 1000; // 1 second animation
            const start = parseInt(totalMusicElement.textContent) || 0;
            const increment = (totalCount - start) / (duration / 16); // 60fps
            let current = start;

            const updateCount = () => {
                current += increment;
                if (
                    (increment > 0 && current >= totalCount) || 
                    (increment < 0 && current <= totalCount)
                ) {
                    totalMusicElement.textContent = totalCount;
                } else {
                    totalMusicElement.textContent = Math.round(current);
                    requestAnimationFrame(updateCount);
                }
            };

            requestAnimationFrame(updateCount);

        } catch (error) {
            console.error('Error updating music stats:', error);
            showNotification('Error loading music stats', 'error');
        }
    }

    // Add real-time updates
    function initializeMusicStatsListener() {
        db.collection('music').onSnapshot((snapshot) => {
            updateMusicStats();
        }, (error) => {
            console.error('Error listening to music changes:', error);
        });
    }

    // Add this near the top of your dashboard.js file
    window.activityTags = []; // Global array for activity tags
    window.activityImageLinks = []; // Global array for activity image links

    // Add activity form handler
    document.getElementById('activityForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const user = auth.currentUser;
            if (!user) {
                showNotification('Please log in to create activities', 'error');
                return;
            }

            const activityData = {
                title: document.getElementById('activityTitle').value,
                description: document.getElementById('activityDescription').value,
                imageUrls: [...window.activityImageLinks], // Use the stored image links
                tags: [...window.activityTags], // Use the stored tags
                userId: user.uid,
                userName: user.displayName || user.email.split('@')[0],
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await db.collection('activities').add(activityData);
            
            // Reset form and arrays
            document.getElementById('activityForm').reset();
            window.activityTags = [];
            window.activityImageLinks = [];
            updateActivityTagList();
            updateImageLinksList();
            
            showNotification('Activity created successfully!', 'success');
            await updateDashboardStats();

            // Switch to activities list view
            document.querySelectorAll('main > section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById('activitiesSection').style.display = 'block';
            await loadActivities();

        } catch (error) {
            console.error('Error creating activity:', error);
            showNotification('Error creating activity: ' + error.message, 'error');
        }
    });

    // Add image link handler
    document.getElementById('addImageLinkBtn')?.addEventListener('click', () => {
        const newImageLink = document.getElementById('newImageLink').value.trim();
        if (newImageLink) {
            window.activityImageLinks = window.activityImageLinks || [];
            window.activityImageLinks.push(newImageLink);
            updateImageLinksList();
            document.getElementById('newImageLink').value = '';
        }
    });

    // Add activity tag handler
    document.getElementById('addActivityTagBtn')?.addEventListener('click', () => {
        const tagName = document.getElementById('activityTagName').value.trim();
        const tagColor = document.getElementById('activityTagColor').value;
        
        if (tagName) {
            window.activityTags = window.activityTags || [];
            window.activityTags.push({ name: tagName, color: tagColor });
            updateActivityTagList();
            document.getElementById('activityTagName').value = '';
        }
    });

    // Function to update image links list
    function updateImageLinksList() {
        const container = document.getElementById('imageLinksContainer');
        if (!container) return;

        container.innerHTML = (window.activityImageLinks || []).map((url, index) => `
            <div class="image-link-item">
                <img src="${url}" alt="Preview" onerror="this.src='${defaultProjectImage}'">
                <button type="button" onclick="removeImageLink(${index})" class="remove-link">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    // Function to remove image link
    window.removeImageLink = function(index) {
        window.activityImageLinks = window.activityImageLinks || [];
        window.activityImageLinks.splice(index, 1);
        updateImageLinksList();
    };

    // Function to update activity tag list
    function updateActivityTagList() {
        const tagList = document.getElementById('activityTagList');
        if (!tagList) return;

        tagList.innerHTML = (window.activityTags || []).map((tag, index) => `
            <span class="tag" style="background-color: ${tag.color}">
                ${tag.name}
                <button type="button" onclick="removeActivityTag(${index})" class="remove-tag">×</button>
            </span>
        `).join('');
    }

    // Function to remove activity tag
    window.removeActivityTag = function(index) {
        window.activityTags = window.activityTags || [];
        window.activityTags.splice(index, 1);
        updateActivityTagList();
    };

    // Initialize tags array for projects
    window.projectTags = [];

    // Project form submission handler
    document.getElementById('projectForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            const user = auth.currentUser;
            if (!user) {
                showNotification('Please log in to create content', 'error');
                return;
            }

            const formData = {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                projectLink: document.getElementById('projectLink').value,
                liveLink: document.getElementById('liveLink').value, // Add this line
                category: document.getElementById('projectCategory').value,
                imageUrl: document.getElementById('imageUpload').value.trim(),
                tags: window.projectTags || [],
                userId: user.uid,
                userName: user.displayName || user.email.split('@')[0],
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            console.log('Saving project with tags:', projectTags);
            await db.collection('projects').add(formData);
            
            // Reset form and clear tags
            projectForm.reset();
            projectTags = [];
            updateTagList();
            imagePreview.style.backgroundImage = '';
            imagePreview.textContent = 'PREVIEW';
            imagePreview.classList.remove('has-image');

            showNotification('Project published successfully!', 'success');
            loadProjects();
        } catch (error) {
            console.error('Error adding project:', error);
            showNotification('Error publishing project. Please try again.', 'error');
        }
    });

    // Tag handling
    if (addTagBtn) {
        addTagBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add tag button clicked');
            
            let name = tagName.value.trim();
            const color = tagColor.value;
            
            if (!name) {
                showNotification('Please enter a tag name', 'warning');
                return;
            }
            
            // Check for duplicate tags
            if (window.projectTags.some(tag => tag.name.toLowerCase() === name.toLowerCase())) {
                showNotification('Tag already exists', 'warning');
                return;
            }
            
            window.projectTags.push({
                name: name,
                color: color
            });
            
            console.log('Current tags:', window.projectTags);
            updateTagList();
            tagName.value = '';
            showNotification(`Tag "${name}" added successfully`, 'success');
        });
    }

    // Function to update tag display
    function updateTagList() {
        if (!tagList) {
            console.error('Tag list element not found!');
            return;
        }
        
        tagList.innerHTML = window.projectTags.map((tag, index) => `
            <span class="tag" style="background-color: ${tag.color}">
                ${tag.name}
                <button type="button" class="remove-tag" onclick="removeTag(${index})">×</button>
            </span>
        `).join('');
    }

    // Make removeTag function global
    window.removeTag = function(index) {
        if (!Array.isArray(window.projectTags)) {
            console.error('projectTags is not an array:', window.projectTags);
            return;
        }
        
        if (index < 0 || index >= window.projectTags.length) {
            console.error('Invalid tag index:', index);
            return;
        }
        
        const removedTag = window.projectTags[index];
        window.projectTags.splice(index, 1);
        updateTagList();
        showNotification(`Tag "${removedTag.name}" removed`, 'info');
    }

    // Function to show notifications
    function showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;
        
        container.style.display = 'flex';
        const notification = document.getElementById('notification');
        const notificationMessage = notification.querySelector('.notification-message');
        const notificationIcon = notification.querySelector('.notification-icon');
        
        notificationMessage.textContent = message;
        notificationIcon.className = `notification-icon fas fa-${
            type === 'success' ? 'check-circle' :
            type === 'error' ? 'times-circle' :
            type === 'warning' ? 'exclamation-triangle' :
            'info-circle'
        }`;
        
        notification.className = `notification ${type}`;
        
        setTimeout(() => {
            container.style.display = 'none';
        }, 3000);
    }

    // Image upload preview
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.style.backgroundImage = `url(${e.target.result})`;
                imagePreview.textContent = '';
                imagePreview.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        }
    });

    imagePreview.addEventListener('click', () => {
        imageUpload.click();
    });

    // Add these near the top of your file, after the existing Firebase initialization


    // Initialize project tags array
    window.projectTags = [];

    // Project form submission handler
    if (projectForm) {
        projectForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const user = auth.currentUser;
                if (!user) {
                    showNotification('Please log in to create content', 'error');
                    return;
                }

                const formData = {
                    title: document.getElementById('title').value,
                    description: document.getElementById('description').value,
                    projectLink: document.getElementById('projectLink').value,
                    liveLink: document.getElementById('liveLink').value, // Add this line
                    category: document.getElementById('projectCategory').value,
                    imageUrl: document.getElementById('imageUpload').value.trim(),
                    tags: window.projectTags || [],
                    userId: user.uid,
                    userName: user.displayName || user.email.split('@')[0],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };

                console.log('Submitting project:', formData);
                await db.collection('projects').add(formData);
                
                showNotification('Project created successfully!', 'success');
                
                // Reset form and tags
                projectForm.reset();
                window.projectTags = [];
                updateTagList();
                
                if (imagePreview) {
                    imagePreview.style.backgroundImage = '';
                    imagePreview.textContent = 'PREVIEW';
                    imagePreview.classList.remove('has-image');
                }
                
                // Redirect to projects list
                document.querySelectorAll('main > section').forEach(section => {
                    section.style.display = 'none';
                });
                const projectsSection = document.getElementById('projectsSection');
                if (projectsSection) {
                    projectsSection.style.display = 'block';
                    await loadProjects();
                }
            } catch (error) {
                console.error('Error creating project:', error);
                showNotification('Error creating project: ' + error.message, 'error');
            }
        });
    }

    // Tag handling
    if (addTagBtn) {
        addTagBtn.addEventListener('click', function() {
            const name = tagName.value.trim();
            const color = tagColor.value;
            
            if (name) {
                window.projectTags.push({ name, color });
                updateTagList();
                tagName.value = '';
                showNotification(`Tag "${name}" added successfully`, 'success');
            }
        });
    }

    // Function to update tag list display
    function updateTagList() {
        if (!tagList) return;

        tagList.innerHTML = (window.projectTags || []).map((tag, index) => `
            <span class="tag" style="background-color: ${tag.color}">
                ${tag.name}
                <button type="button" onclick="removeTag(${index})" class="tag-delete">&times;</button>
            </span>
        `).join('');
    }

    // Function to remove tag
    window.removeTag = function(index) {
        window.projectTags = window.projectTags || [];
        window.projectTags.splice(index, 1);
        updateTagList();
        showNotification('Tag removed', 'info');
    };

    // Image upload preview
    if (imageUpload && imagePreview) {
        imageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.style.backgroundImage = `url(${e.target.result})`;
                    imagePreview.textContent = '';
                    imagePreview.classList.add('has-image');
                };
                reader.readAsDataURL(file);
            }
        });

        imagePreview.addEventListener('click', () => {
            imageUpload.click();
        });
    }

    // Reset form handler
    if (projectForm) {
        projectForm.addEventListener('reset', () => {
            window.projectTags = [];
            updateTagList();
            if (imagePreview) {
                imagePreview.style.backgroundImage = '';
                imagePreview.textContent = 'PREVIEW';
                imagePreview.classList.remove('has-image');
            }
        });
    }

    // Add scroll functionality for project grid
    document.addEventListener('DOMContentLoaded', function() {
        const projectList = document.getElementById('projectList');
        const scrollLeft = projectList.querySelector('.scroll-left');
        const scrollRight = projectList.querySelector('.scroll-right');
    
        // Check if content is scrollable
        function checkScrollable() {
            const isScrollable = projectList.scrollWidth > projectList.clientWidth;
            projectList.classList.toggle('scrollable', isScrollable);
        }
    
        // Add scroll handlers
        scrollLeft.addEventListener('click', () => {
            projectList.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
    
        scrollRight.addEventListener('click', () => {
            projectList.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    
        // Check on load and when projects are added
        checkScrollable();
        window.addEventListener('resize', checkScrollable);
        
        // Add check after projects are loaded
        const originalLoadProjects = window.loadProjects;
        window.loadProjects = async function() {
            await originalLoadProjects();
            checkScrollable();
        };
    });

    // Function to initialize edit mode tags
    window.initializeEditTags = function(tags) {
        window.editProjectTags = [...(tags || [])];
        updateEditTagList();
    };

    // Function to open edit modal
    function openEditModal(project) {
        // Initialize edit mode tags
        window.initializeEditTags(project.tags);
        
        // Set other form values
        document.getElementById('editTitle').value = project.title;
        document.getElementById('editDescription').value = project.description;
        // ... rest of your edit modal code ...
    }

    // Make removeMusicTag function globally available
    window.removeMusicTag = function(index) {
        console.log('Removing music tag at index:', index);
        if (!Array.isArray(window.musicTags)) {
            window.musicTags = [];
            return;
        }
        
        if (index < 0 || index >= window.musicTags.length) {
            console.error('Invalid tag index:', index);
            return;
        }
        
        const removedTag = window.musicTags[index];
        window.musicTags.splice(index, 1);
        window.updateMusicTagList();
        showNotification(`Tag "${removedTag.name}" removed`, 'info');
    };

    // Function to update music tag list display
    window.updateMusicTagList = function() {
        const musicTagList = document.getElementById('musicTagList');
        if (!musicTagList) {
            console.error('Music tag list element not found!');
            return;
        }
        
        musicTagList.innerHTML = window.musicTags.map((tag, index) => `
            <span class="tag" style="background-color: ${tag.color}">
                ${tag.name}
                <button type="button" class="remove-tag" onclick="removeMusicTag(${index})">×</button>
            </span>
        `).join('');
    };

    // Function to add music tag
    window.addMusicTag = function(name, color) {
        if (!name) {
            showNotification('Please enter a tag name', 'warning');
            return;
        }
        
        if (!Array.isArray(window.musicTags)) {
            window.musicTags = [];
        }
        
        // Check for duplicate tags
        if (window.musicTags.some(tag => tag.name.toLowerCase() === name.toLowerCase())) {
            showNotification('Tag already exists', 'warning');
            return;
        }
        
        window.musicTags.push({ name, color });
        window.updateMusicTagList();
        showNotification(`Tag "${name}" added successfully`, 'success');
    };

    document.addEventListener('DOMContentLoaded', function() {
        // Add music tag button handler
        const addMusicTagBtn = document.getElementById('addMusicTagBtn');
        const musicTagName = document.getElementById('musicTagName');
        const musicTagColor = document.getElementById('musicTagColor');
        
        if (addMusicTagBtn && musicTagName && musicTagColor) {
            addMusicTagBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const name = musicTagName.value.trim();
                const color = musicTagColor.value;
                
                window.addMusicTag(name, color);
                musicTagName.value = '';  // Clear input after adding
            });
        }
    });

    // Define removeMusicTag in the global scope
    function removeMusicTag(index) {
        console.log('Removing music tag at index:', index);
        if (!Array.isArray(window.musicTags)) {
            window.musicTags = [];
            return;
        }
        
        if (index < 0 || index >= window.musicTags.length) {
            console.error('Invalid tag index:', index);
            return;
        }
        
        const removedTag = window.musicTags[index];
        window.musicTags.splice(index, 1);
        updateMusicTagList();
        showNotification(`Tag "${removedTag.name}" removed`, 'info');
    }

    // Define updateMusicTagList in the global scope
    function updateMusicTagList() {
        const musicTagList = document.getElementById('musicTagList');
        if (!musicTagList) {
            console.error('Music tag list element not found!');
            return;
        }
        
        musicTagList.innerHTML = window.musicTags.map((tag, index) => `
            <span class="tag" style="background-color: ${tag.color}">
                ${tag.name}
                <button type="button" class="remove-tag" onclick="removeMusicTag(${index})">×</button>
            </span>
        `).join('');
    }

    // Define addMusicTag in the global scope
    function addMusicTag(name, color) {
        if (!name) {
            showNotification('Please enter a tag name', 'warning');
            return;
        }
        
        if (!Array.isArray(window.musicTags)) {
            window.musicTags = [];
        }
        
        // Check for duplicate tags
        if (window.musicTags.some(tag => tag.name.toLowerCase() === name.toLowerCase())) {
            showNotification('Tag already exists', 'warning');
            return;
        }
        
        window.musicTags.push({ name, color });
        updateMusicTagList();
        showNotification(`Tag "${name}" added successfully`, 'success');
    }

    // Add this function to save email privacy settings
    async function saveEmailPrivacy() {
        const isPrivate = document.getElementById('emailPrivacyToggle').checked;
        const user = auth.currentUser;
        
        if (user) {
            try {
                await db.collection('users').doc(user.uid).update({
                    emailPrivacy: isPrivate
                });
                
                // Update display
                const email = user.email;
                updateEmailDisplay(email, isPrivate);
                
                // Update status text
                document.getElementById('emailPrivacyStatus').textContent = 
                    isPrivate ? 'Private' : 'Public';
                    
                showNotification('Email privacy settings updated!', 'success');
            } catch (error) {
                console.error('Error updating email privacy:', error);
                showNotification('Error updating email privacy settings', 'error');
            }
        }
    }

    // Add event listener for the toggle
    document.getElementById('emailPrivacyToggle')?.addEventListener('change', function() {
        document.getElementById('emailPrivacyStatus').textContent = 
            this.checked ? 'Private' : 'Public';
    });




    ///////////// SHOP CONTENT /////////////
let shopContentTags = [];

// Shop Content Functions
function addShopContentTag() {
    const tagInput = document.getElementById('shopcontent-tagInput');
    const tag = tagInput.value.trim();
    
    if (tag && !shopContentTags.includes(tag)) {
        shopContentTags.push(tag);
        updateShopContentTagList();
        tagInput.value = '';
    } else {
        showNotification('Tag already exists or is empty', 'warning');
    }
}

function removeShopContentTag(index) {
    shopContentTags.splice(index, 1);
    updateShopContentTagList();
}

function updateShopContentTagList() {
    const tagList = document.getElementById('shopcontent-tagList');
    tagList.innerHTML = shopContentTags.map((tag, index) => `
        <span class="tag">
            ${tag}
            <button type="button" class="remove-tag" onclick="removeShopContentTag(${index})">×</button>
        </span>
    `).join('');
}

// Shop content form submission
document.getElementById('shopContentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const shopData = {
            title: document.getElementById('shopcontent-title').value,
            description: document.getElementById('shopcontent-description').value,
            streamableLink: document.getElementById('shopcontent-streamlink').value,
            price: parseFloat(document.getElementById('shopcontent-price').value),
            websiteLink: document.getElementById('shopcontent-websitelink').value,
            category: document.getElementById('shopcontent-category').value,
            tags: [...shopContentTags],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        const form = e.target;
        const editingId = form.getAttribute('data-editing');

        if (editingId) {
            // Update existing item
            await db.collection('shopItems').doc(editingId).update({
                ...shopData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            showNotification('Shop item updated successfully!', 'success');
            form.removeAttribute('data-editing');
            form.querySelector('.publish-btn').innerHTML = '<i class="fas fa-plus"></i> ADD SHOP ITEM';
        } else {
            // Add new item
            await db.collection('shopItems').add(shopData);
            showNotification('Shop item added successfully!', 'success');
        }

        // Reset form and tags
        form.reset();
        shopContentTags = [];
        updateShopContentTagList();
        loadShopItems();
        
    } catch (error) {
        console.error('Error saving shop item:', error);
        showNotification('Error saving shop item', 'error');
    }
});

// Load shop items in dashboard
async function loadShopItems() {
    const shopItemsLists = document.querySelectorAll('#shopItemsList');
    if (!shopItemsLists.length) return;
    
    try {
        const snapshot = await db.collection('shopItems')
            .orderBy('createdAt', 'desc')
            .get();
        
        const content = snapshot.empty ? `
            <div class="no-items-message">
                    <i class="fas fa-store-slash"></i>
                <p>No products available</p>
            </div>` : 
            snapshot.docs.map(doc => {
                const item = doc.data();
                return createShopItemCard(item, doc.id).outerHTML;
            }).join('');

        shopItemsLists.forEach(list => {
            list.innerHTML = content;
        });
    } catch (error) {
        console.error('Error loading shop items:', error);
        showNotification('Error loading shop items', 'error');
        
        shopItemsLists.forEach(list => {
            list.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Error loading shop items</p>
                </div>`;
        });
    }
}

function createShopItemCard(item) {
    const card = document.createElement('div');
    card.className = 'content-card shopcontent-card';
    
    card.innerHTML = `
        <div class="card-content">
            <span class="category-badge ${item.category}">${item.category}</span>
            <h3 class="card-title">${item.title}</h3>
            <p class="card-description">${item.description}</p>
            <div class="card-price">$${item.price.toFixed(2)}</div>
            <div class="card-tags">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="card-links">
                <a href="${item.streamableLink}" target="_blank" class="card-link">
                    <i class="fas fa-play"></i> Preview
                </a>
                <a href="${item.websiteLink}" target="_blank" class="card-link">
                    <i class="fas fa-link"></i> Website
                </a>
            </div>
            <div class="card-actions">
                <button onclick="editShopItem('${item.id}')" class="edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteShopItem('${item.id}')" class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;

    return card;
}

async function deleteShopItem(id) {
    if (await showConfirmDialog('Delete Shop Item', 'Are you sure you want to delete this shop item?')) {
        try {
            await db.collection('shopItems').doc(id).delete();
            showNotification('Shop item deleted successfully', 'success');
            loadShopItems();
        } catch (error) {
            console.error('Error deleting shop item:', error);
            showNotification('Error deleting shop item', 'error');
        }
    }
}

async function editShopItem(id) {
    try {
        const doc = await db.collection('shopItems').doc(id).get();
        const item = doc.data();
        
        // Populate form with existing data
        document.getElementById('shopcontent-title').value = item.title;
        document.getElementById('shopcontent-description').value = item.description;
        document.getElementById('shopcontent-streamlink').value = item.streamableLink;
        document.getElementById('shopcontent-price').value = item.price;
        document.getElementById('shopcontent-websitelink').value = item.websiteLink;
        document.getElementById('shopcontent-category').value = item.category;
        
        // Update tags
        shopContentTags = [...item.tags];
        updateShopContentTagList();
        
        // Change form submit button
        const submitBtn = document.querySelector('#shopContentForm .publish-btn');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> UPDATE SHOP ITEM';
        
        // Add data-editing attribute to form
        const form = document.getElementById('shopContentForm');
        form.setAttribute('data-editing', id);
        
        // Scroll to form
        form.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error loading shop item for edit:', error);
        showNotification('Error loading shop item', 'error');
    }
}

// Add this to your section visibility handler function
function showSection(sectionId) {
    try {
        // Handle special cases first
        if (sectionId === 'fivemApi') {
            window.location.href = 'fivemapi.php';
            return;
        }

        // Hide all sections
        document.querySelectorAll('main > section').forEach(section => {
            if (section) section.style.display = 'none';
        });

        // Show selected section
        const selectedSection = document.getElementById(`${sectionId}Section`);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }

        // Update sidebar active state
        document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
        const activeLink = document.querySelector(`.sidebar a[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.closest('li')?.classList.add('active');
        }
    } catch (error) {
        console.error('Error showing section:', error);
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize sidebar navigation
    document.querySelectorAll('.sidebar a[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = e.currentTarget.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Initialize shop form
    const shopForm = document.getElementById('shopContentForm');
    if (shopForm) {
        shopForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                const shopData = {
                    title: document.getElementById('shopTitle').value,
                    description: document.getElementById('shopDescription').value,
                    streamableLink: document.getElementById('shopStreamLink').value,
                    price: parseFloat(document.getElementById('shopPrice').value),
                    websiteLink: document.getElementById('shopWebsiteLink').value,
                    tags: [...shopTags],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    userId: auth.currentUser.uid
                };

                await db.collection('shopItems').add(shopData);
                showNotification('Shop item created successfully!', 'success');
                
                // Reset form and tags
                e.target.reset();
                shopTags = [];
                updateShopTagList();
                
                // Reload shop items list
                loadShopItems();
            } catch (error) {
                console.error('Error creating shop item:', error);
                showNotification('Error creating shop item', 'error');
            }
        });
    }

    // Initialize shop tags
    const addTagBtn = document.getElementById('shopTagInput');
    if (addTagBtn) {
        window.shopTags = [];  // Initialize tags array
        updateShopTagList();   // Initialize tag list display
    }

    // Show initial section
    showSection('profile');
});


// Add event listener for shop content form submission
document.getElementById('shopContentForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const shopData = {
            title: document.getElementById('shopTitle').value,
            description: document.getElementById('shopDescription').value,
            streamableLink: document.getElementById('shopStreamLink').value,
            price: parseFloat(document.getElementById('shopPrice').value),
            websiteLink: document.getElementById('shopWebsiteLink').value,
            tags: [...shopTags],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            userId: auth.currentUser.uid
        };

        await db.collection('shopItems').add(shopData);
        showNotification('Shop item created successfully!', 'success');
        
        // Reset form and tags
        e.target.reset();
        shopTags = [];
        updateShopTagList();
        
        // Reload shop items list
        loadShopItems();
    } catch (error) {
        console.error('Error creating shop item:', error);
        showNotification('Error creating shop item', 'error');
    }
}); 

// Initialize all event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove the duplicate event listener setup and use a single handler
    const shopForm = document.getElementById('shopContentForm');
    if (shopForm) {
        const submitHandler = async (e) => {
            e.preventDefault();
            
            try {
                const shopData = {
                    title: document.getElementById('shopTitle')?.value || '',
                    description: document.getElementById('shopDescription')?.value || '',
                    streamableLink: document.getElementById('shopStreamLink')?.value || '',
                    price: parseFloat(document.getElementById('shopPrice')?.value || '0'),
                    websiteLink: document.getElementById('shopWebsiteLink')?.value || '',
                    tags: [...shopTags],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    userId: auth.currentUser?.uid
                };

                await db.collection('shopItems').add(shopData);
                showNotification('Shop item created successfully!', 'success');
                
                // Reset form and tags
                e.target.reset();
                shopTags = [];
                updateShopTagList();
                
                // Reload shop items list
                loadShopItems();
            } catch (error) {
                console.error('Error creating shop item:', error);
                showNotification('Error creating shop item', 'error');
            }
        };

        // Remove any existing listeners and add new one
        shopForm.removeEventListener('submit', submitHandler);
        shopForm.addEventListener('submit', submitHandler);
    }

    // Initialize navigation
    const navLinks = document.querySelectorAll('.sidebar a[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            if (sectionId) showSection(sectionId);
        });
    });

    // Initialize shop tags
    const addTagBtn = document.getElementById('addShopTagBtn');
    if (addTagBtn) {
        addTagBtn.addEventListener('click', addShopTag);
    }

    // Show initial section
    showSection('profile');
});

// Add shop tag function
function addShopTag() {
    const tagInput = document.getElementById('shopTagInput');
    const tagColor = document.getElementById('shopTagColor');
    if (!tagInput || !tagColor) {
        console.warn('Tag input elements not found');
        return;
    }
    
    const tagName = tagInput.value.trim();
    
    if (!tagName) {
        showNotification('Please enter a tag name', 'warning');
        return;
    }
    
    if (shopTags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase())) {
        showNotification('Tag already exists', 'warning');
        return;
    }
    
    shopTags.push({
        name: tagName,
        color: tagColor.value
    });
    
    updateShopTagList();
    tagInput.value = '';
}

// Remove shop tag function
window.removeShopTag = function(index) {
    if (!Array.isArray(shopTags)) {
        console.error('shopTags is not an array');
        return;
    }
    shopTags.splice(index, 1);
    updateShopTagList();
};

// Update shop tag list
function updateShopTagList() {
    const tagList = document.getElementById('shopTagList');
    if (!tagList) {
        console.warn('Tag list element not found');
        return;
    }
    
    tagList.innerHTML = shopTags.map((tag, index) => `
        <span class="tag" style="background-color: ${tag.color}">
            ${tag.name}
            <button type="button" onclick="removeShopTag(${index})" class="remove-tag">×</button>
        </span>
    `).join('');
}

// Show notification with null check
function showNotification(message, type = 'info') {
    try {
        const notification = document.getElementById('notification');
        if (!notification) {
            console.warn('Notification element not found');
            return;
        }

        const messageElement = notification.querySelector('.notification-message');
        if (!messageElement) {
            console.warn('Notification message element not found');
            return;
        }

        messageElement.textContent = message || 'Unknown message';
        notification.className = `notification show ${type}`;
        
        setTimeout(() => {
            if (notification.classList.contains('show')) {
                notification.classList.remove('show');
            }
        }, 3000);
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

// Section visibility handler
function showSection(sectionId) {
    try {
        // Handle special cases first
        if (sectionId === 'fivemApi') {
            window.location.href = 'fivemapi.php';
            return;
        }

        // Hide all sections
        document.querySelectorAll('main > section').forEach(section => {
            if (section) section.style.display = 'none';
        });

        // Show selected section
        const selectedSection = document.getElementById(`${sectionId}Section`);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }

        // Update sidebar active state
        document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
        const activeLink = document.querySelector(`.sidebar a[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.closest('li')?.classList.add('active');
        }
    } catch (error) {
        console.error('Error showing section:', error);
    }
}

// Global variables

// Initialize shop functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeShopForm();
    initializeShopTags();
});

function initializeShopForm() {
    const shopForm = document.getElementById('shopContentForm');
    if (shopForm) {
        shopForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                const shopData = {
                    title: document.getElementById('shopTitle')?.value || '',
                    description: document.getElementById('shopDescription')?.value || '',
                    streamableLink: document.getElementById('shopStreamLink')?.value || '',
                    price: parseFloat(document.getElementById('shopPrice')?.value || '0'),
                    websiteLink: document.getElementById('shopWebsiteLink')?.value || '',
                    tags: [...shopTags],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    userId: auth.currentUser?.uid
                };

                await db.collection('shopItems').add(shopData);
                showNotification('Shop item created successfully!', 'success');
                
                // Reset form and tags
                e.target.reset();
                shopTags = [];
                updateShopTagList();
                
                // Show shop list section and load items
                showSection('shopList');
            } catch (error) {
                console.error('Error creating shop item:', error);
                showNotification('Error creating shop item', 'error');
            }
        });
    }
}

function initializeShopTags() {
    const addTagBtn = document.getElementById('addShopTagBtn');
    if (addTagBtn) {
        addTagBtn.addEventListener('click', addShopTag);
    }
    updateShopTagList();
}

function addShopTag() {
    const tagInput = document.getElementById('shopTagInput');
    const tagColor = document.getElementById('shopTagColor');
    
    if (!tagInput || !tagColor) return;
    
    const tagName = tagInput.value.trim();
    
    if (!tagName) {
        showNotification('Please enter a tag name', 'warning');
        return;
    }
    
    if (shopTags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase())) {
        showNotification('Tag already exists', 'warning');
        return;
    }
    
    shopTags.push({
        name: tagName,
        color: tagColor.value
    });
    
    updateShopTagList();
    tagInput.value = '';
}

function updateShopTagList() {
    const tagList = document.getElementById('shopTagList');
    if (!tagList) return;
    
    tagList.innerHTML = shopTags.map((tag, index) => `
        <span class="tag" style="background-color: ${tag.color}">
            ${tag.name}
            <button type="button" onclick="removeShopTag(${index})" class="remove-tag">×</button>
        </span>
    `).join('');
}


window.removeShopTag = function(index) {
    shopTags.splice(index, 1);
    updateShopTagList();
};


