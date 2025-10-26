<script>
        let activeEnv = 'blue';
        let blueVersion = 1.0;
        let greenVersion = 1.0;
        let isDeployed = false;

        function updateMessage(text) {
            document.getElementById('message').textContent = text;
        }

        function deployNewVersion() {
            const standbyEnv = activeEnv === 'blue' ? 'green' : 'blue';
            const newVersion = activeEnv === 'blue' ? greenVersion + 0.1 : blueVersion + 0.1;
            
            updateMessage(`🔄 Deploying version ${newVersion.toFixed(1)} to ${standbyEnv.toUpperCase()} environment...`);

            setTimeout(() => {
                updateMessage(`📦 Building Docker image for version ${newVersion.toFixed(1)}...`);
            }, 1000);

            setTimeout(() => {
                updateMessage(`☸️ Updating Kubernetes pods in ${standbyEnv.toUpperCase()} environment...`);
            }, 2000);

            setTimeout(() => {
                updateMessage(`🔍 Running health checks on ${standbyEnv.toUpperCase()} environment...`);
            }, 3000);

            setTimeout(() => {
                if (standbyEnv === 'green') {
                    greenVersion = newVersion;
                    document.getElementById('greenVersion').textContent = `Version ${newVersion.toFixed(1)}`;
                } else {
                    blueVersion = newVersion;
                    document.getElementById('blueVersion').textContent = `Version ${newVersion.toFixed(1)}`;
                }
                
                isDeployed = true;
                updateMessage(`✅ Version ${newVersion.toFixed(1)} successfully deployed to ${standbyEnv.toUpperCase()}! Ready to switch traffic.`);
            }, 4000);
        }

        function switchTraffic() {
            if (!isDeployed) {
                updateMessage('⚠️ Please deploy a new version first before switching traffic!');
                return;
            }

            const blueEnvEl = document.getElementById('blueEnv');
            const greenEnvEl = document.getElementById('greenEnv');
            const switchBtn = document.getElementById('switchBtn');
            
            switchBtn.disabled = true;
            blueEnvEl.classList.add('switching');
            greenEnvEl.classList.add('switching');

            updateMessage('🔄 Initiating traffic switch...');

            setTimeout(() => {
                updateMessage('⚡ Updating load balancer configuration...');
            }, 500);

            setTimeout(() => {
                updateMessage('🔀 Routing traffic to new environment...');
                
                if (activeEnv === 'blue') {
                    // Switch to Green
                    activeEnv = 'green';
                    
                    document.getElementById('blueTraffic').style.width = '0%';
                    document.getElementById('greenTraffic').style.width = '100%';
                    document.getElementById('bluePercent').textContent = '';
                    document.getElementById('greenPercent').textContent = '100%';
                    
                    document.getElementById('blueStatus').textContent = 'STANDBY - 0% Traffic';
                    document.getElementById('blueStatus').className = 'status standby';
                    document.getElementById('greenStatus').textContent = 'ACTIVE - 100% Traffic';
                    document.getElementById('greenStatus').className = 'status active';
                } else {
                    // Switch to Blue
                    activeEnv = 'blue';
                    
                    document.getElementById('blueTraffic').style.width = '100%';
                    document.getElementById('greenTraffic').style.width = '0%';
                    document.getElementById('bluePercent').textContent = '100%';
                    document.getElementById('greenPercent').textContent = '';
                    
                    document.getElementById('blueStatus').textContent = 'ACTIVE - 100% Traffic';
                    document.getElementById('blueStatus').className = 'status active';
                    document.getElementById('greenStatus').textContent = 'STANDBY - 0% Traffic';
                    document.getElementById('greenStatus').className = 'status standby';
                }
            }, 1000);

            setTimeout(() => {
                blueEnvEl.classList.remove('switching');
                greenEnvEl.classList.remove('switching');
                switchBtn.disabled = false;
                isDeployed = false;
                
                updateMessage(`✅ Traffic successfully switched to ${activeEnv.toUpperCase()} environment! Zero downtime achieved.`);
            }, 2000);
        }
    </script>