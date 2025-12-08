const searchInput = document.getElementById('searchInput');
        const modal = document.getElementById('howItWorksModal');
        
        // Show modal on first visit
        window.addEventListener('load', () => {
            if (!localStorage.getItem('visitedBefore')) {
                openModal();
                localStorage.setItem('visitedBefore', 'true');
            }
        });

        function openModal() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchRecipes();
            }
        });

        function quickSearch(query) {
            searchInput.value = query;
            searchRecipes();
        }

        function searchRecipes() {
            const query = searchInput.value.trim();
            if (!query) {
                alert('Please enter a search term');
                return;
            }

            const resultsDiv = document.getElementById('results');
            const resultsContent = document.getElementById('resultsContent');
            
            resultsDiv.classList.add('active');
            resultsContent.innerHTML = '<div class="loading">🔍 Searching for recipes...</div>';

            // Simulate search and redirect to Google search for recipes
            setTimeout(() => {
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query + ' recipe')}`;
                
                resultsContent.innerHTML = `
                    <div style="text-align: center; padding: 30px;">
                        <h3 style="color: #333; margin-bottom: 20px;">Ready to find "${query}" recipes!</h3>
                        <p style="color: #666; margin-bottom: 25px; font-size: 1.1em;">Click below to search for recipes on the web:</p>
                        <a href="${searchUrl}" target="_blank" style="display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #707070ff 0%, #202020ff 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 1.1em;">
                            Search for ${query} recipes →
                        </a>
                        <p style="color: #999; margin-top: 20px; font-size: 0.9em;">Or try the popular recipe sites below!</p>
                    </div>
                `;
            }, 800);
        }