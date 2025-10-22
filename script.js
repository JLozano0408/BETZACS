document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS (declared with const for safety) ---
    const loginScreen = document.getElementById('login-screen');
    const mainApp = document.getElementById('main-app');
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const headerTitle = document.getElementById('header-title');
    const navButtons = document.querySelectorAll('.nav-btn');
    const navEarningsBtn = document.getElementById('nav-earnings-btn');
    const navClientsBtn = document.getElementById('nav-clients-btn');
    const contentDivs = {
        schedule: document.getElementById('schedule-content'),
        'time-pay': document.getElementById('time-pay-content'),
        earnings: document.getElementById('earnings-content'),
        settings: document.getElementById('settings-content'),
        clients: document.getElementById('clients-content')
    };
    const clockBtn = document.getElementById('clock-btn');
    const shiftTimerDisplay = document.getElementById('shift-timer');
    const addJobModal = document.getElementById('add-job-modal');
    const addJobBtn = document.getElementById('add-job-btn');
    const addJobForm = document.getElementById('add-job-form');
    const addUserForm = document.getElementById('add-user-form');
    const userListDiv = document.getElementById('user-list');
    const addUserError = document.getElementById('addUserError');
    const showAddUserFormBtn = document.getElementById('show-add-user-form-btn');
    const addUserContainer = document.getElementById('add-user-container');
    const addManualEntryBtn = document.getElementById('add-manual-entry-btn');
    const timesheetEditModal = document.getElementById('timesheet-edit-modal');
    const timesheetModalTitle = document.getElementById('timesheet-modal-title');
    const timesheetEditForm = document.getElementById('timesheet-edit-form');
    const timesheetEntryIndexInput = document.getElementById('timesheet-entry-index');
    const confirmDeleteModal = document.getElementById('confirm-delete-modal');
    const confirmDeleteText = document.getElementById('confirm-delete-text');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const passwordResetModal = document.getElementById('password-reset-modal');
    const passwordResetForm = document.getElementById('password-reset-form');
    const userDetailsModal = document.getElementById('user-details-modal');
    const userDetailsModalTitle = document.getElementById('user-details-modal-title');
    const userDetailsModalBody = document.getElementById('user-details-modal-body');
    const clientModal = document.getElementById('client-modal');
    const clientModalTitle = document.getElementById('client-modal-title');
    const clientForm = document.getElementById('client-form');
    const clientListDiv = document.getElementById('client-list');
    const clientDetailsModal = document.getElementById('client-details-modal');
    const clientDetailsModalTitle = document.getElementById('client-details-modal-title');
    const clientDetailsModalBody = document.getElementById('client-details-modal-body');
    const paymentMethodModal = document.getElementById('payment-method-modal');
    const paymentForm = document.getElementById('payment-form');
    const infoModal = document.getElementById('info-modal');
    const infoModalTitle = document.getElementById('info-modal-title');
    const infoModalText = document.getElementById('info-modal-text');
    const scheduleDatePicker = document.getElementById('schedule-date-picker');
    const settingsLogoutBtn = document.getElementById('settings-logout-btn');
    const settingsManageUsersBtn = document.getElementById('settings-manage-users-btn');
    const weekSelect = document.getElementById('week-select');
    const adminWeekSelect = document.getElementById('admin-week-select');
    const clientSearchInput = document.getElementById('client-search-input');
    const timePickerModal = document.getElementById('time-picker-modal');
    const jobTimeInput = document.getElementById('jobTime');


    // --- DATA & STATE ---
    let users, clients, nextClientId, nextUserId, nextJobId, schedule, timesheets, payAdjustments;

    let currentUser = null;
    let clockInTime = null;
    let shiftTimerInterval = null;
    let itemToDelete = { type: null, id: null, element: null };
    
    // --- TRANSLATIONS & SETTINGS ---
    const translations = {
        en: {
            schedule: 'Schedule', clients: 'Clients', time_pay: 'Time & Pay', earnings: 'Earnings', settings: 'Settings',
            username: "Username", password: "Password",
            login: "Login", login_error: "Invalid username or password.",
            change_password: "Change Password", new_password: "New Password", confirm_new_password: "Confirm New Password",
            save_password: "Save Password", language: "Language", appearance: "Appearance", dark_mode: "Dark Mode",
            password_mismatch: "Passwords do not match.", password_short: "Password must be at least 6 characters.",
            password_success: "Password updated successfully!",
            add_job: "Add Job", 
            clock_in: "Clock In", clock_out: "Clock Out", select_employee: "Select Employee:", select_date: "Select Date",
            add_manual_entry: "Add Manual Entry",
            add_user: "Add", add_new_user: "Add New User", role: "Role",
            hourly_wage: "Hourly Wage ($)", add_user_button: "Add User", existing_users: "Existing Users",
            total_hours_worked: "Total Hours Worked:", base_pay: "Base Pay:", vehicle_pay: "Vehicle Usage Pay:",
            total_pay: "Estimated Total Pay:", delete_user: "Delete User", save_changes: "Save Changes",
            vehicle_pay_amount: "Vehicle Pay Amount ($)", saved: "Saved!",
            add_new_job_title: "Add New Job", client_name: "Client Name", address: "Address", time: "Time",
            tasks: "Tasks", assign_employee: "Assign Employee", cancel: "Cancel", save_job: "Save Job", job_price: "Job Price ($)",
            edit_time_entry: "Edit Time Entry", date: "Date", clock_in_time: "Clock In Time",
            clock_out_time: "Clock Out Time", are_you_sure: "Are you sure?",
            cannot_be_undone: "This action cannot be undone.", delete: "Delete",
            reset_password: "Reset Password", add_client: "Add Client",
            phone_number: "Phone Number", recurrence: "Recurrence", save_client: "Save Client", select_client: "Select Client",
            cleaning_history: "Cleaning & Payment History", edit_client: "Edit Client",
            mark_as_paid: "Mark as Paid", payment_method: "Payment Method", save_payment: "Save Payment",
            hourly_rate: "Hourly Rate", back: "Back", total_income: "Total Income",
            day_earnings: "Day", week_earnings: "This Week", month_earnings: "This Month", display_language: "Display & Language", logout: "Logout",
            my_timesheet: "My Timesheet", select_week: "Select Week", total_hours_period: "Total Hours (Period):", pay_estimate_period: "Pay Estimate (Period)",
            client_details: "Client Details",
            recurrence_one_time: "One Time",
            recurrence_weekly: "Weekly",
            recurrence_biweekly: "Biweekly (Every 2 Weeks)",
            recurrence_three_weeks: "Every 3 Weeks",
            recurrence_monthly: "Monthly",
            payroll: "Payroll",
            net_income: "Net Income",
            completed_jobs: "Completed Jobs",
            paid: "Paid",
            unpaid: "Unpaid",
            edit: "Edit",
            manage_users: "Manage Users",
            administrator: "Administrator",
            employee: "Employee",
            canceled: "Canceled",
        },
        es: {
            schedule: 'Horario', clients: 'Clientes', time_pay: 'Planilla y Paga', earnings: 'Ganancias', settings: 'Ajustes',
            username: "Usuario", password: "Clave",
            login: "Entrar", login_error: "Usuario o clave inválido.",
            change_password: "Cambiar Clave", new_password: "Nueva Clave", confirm_new_password: "Confirmar Nueva Clave",
            save_password: "Guardar Clave", language: "Idioma", appearance: "Apariencia", dark_mode: "Modo Oscuro",
            password_mismatch: "Las claves no coinciden.", password_short: "La clave debe tener al menos 6 caracteres.",
            password_success: "¡Clave actualizada con éxito!",
            add_job: "Añadir Tarea",
            clock_in: "Marcar Entrada", clock_out: "Marcar Salida", select_employee: "Seleccionar Empleado:", select_date: "Seleccionar Fecha",
            add_manual_entry: "Añadir Entrada Manual",
            add_user: "Añadir", add_new_user: "Añadir Nuevo Usuario", role: "Rol",
            hourly_wage: "Salario por Hora ($)", add_user_button: "Añadir Usuario", existing_users: "Usuarios Existentes",
            total_hours_worked: "Total Horas Trabajadas:", base_pay: "Paga Base:", vehicle_pay: "Paga de Vehículo:",
            total_pay: "Paga Total Estimada:", delete_user: "Eliminar Usuario", save_changes: "Guardar Cambios",
            vehicle_pay_amount: "Monto de Paga de Vehículo ($)", saved: "¡Guardado!",
            add_new_job_title: "Añadir Nueva Tarea", client_name: "Nombre del Cliente", address: "Dirección", time: "Hora",
            tasks: "Tareas", assign_employee: "Asignar Empleado", cancel: "Cancelar", save_job: "Guardar Tarea", job_price: "Precio del Trabajo ($)",
            edit_time_entry: "Editar Entrada de Tiempo", date: "Fecha", clock_in_time: "Hora de Entrada",
            clock_out_time: "Hora de Salida", are_you_sure: "¿Estás seguro?",
            cannot_be_undone: "Esta acción no se puede deshacer.", delete: "Eliminar",
            reset_password: "Restablecer Clave", add_client: "Añadir Cliente",
            phone_number: "Número de Teléfono", recurrence: "Frecuencia", save_client: "Guardar Cliente", select_client: "Seleccionar Cliente",
            cleaning_history: "Historial de Limpieza y Pagos", edit_client: "Editar Cliente",
            mark_as_paid: "Marcar como Pagado", payment_method: "Método de Pago", save_payment: "Guardar Pago",
            hourly_rate: "Tarifa por Hora", back: "Atrás", total_income: "Ingresos Totales",
            day_earnings: "Día", week_earnings: "Esta Semana", month_earnings: "Este Mes", display_language: "Pantalla e Idioma", logout: "Cerrar Sesión",
            my_timesheet: "Mi Planilla", select_week: "Seleccionar Semana", total_hours_period: "Total de Horas (Periodo):", pay_estimate_period: "Estimado de Paga (Periodo)",
            client_details: "Detalles del Cliente",
            recurrence_one_time: "Una Vez",
            recurrence_weekly: "Semanal",
            recurrence_biweekly: "Quincenal (Cada 2 Semanas)",
            recurrence_three_weeks: "Cada 3 Semanas",
            recurrence_monthly: "Mensual",
            payroll: "Nómina",
            net_income: "Ingreso Neto",
            completed_jobs: "Trabajos Completados",
            paid: "Pagado",
            unpaid: "No Pagado",
            edit: "Editar",
            manage_users: "Gestionar Usuarios",
            administrator: "Administrador",
            employee: "Empleado",
            canceled: "Cancelado",
        }
    };
    let currentLang = 'en';
    let currentTheme = 'light';

    // --- CORE & HELPER FUNCTIONS ---

    function saveState() {
        const appState = {
            users,
            clients,
            nextClientId,
            nextUserId,
            nextJobId,
            schedule,
            timesheets,
            payAdjustments
        };
        localStorage.setItem('betzaAppState', JSON.stringify(appState));
    }
    
    function getFullAddressString(addressObj) {
        if (!addressObj) return '';
        if (typeof addressObj === 'string') return addressObj; // Backwards compatibility
        return [addressObj.street, addressObj.apt, addressObj.city, addressObj.state, addressObj.zip].filter(Boolean).join(', ');
    }
    
    // Simple migration for old address string format
    function migrateAddressData(data) {
        if (!data) return;
        Object.values(data).forEach(item => {
            if (item.address && typeof item.address === 'string') {
                item.address = {
                    street: item.address,
                    apt: '',
                    city: '',
                    state: 'CO',
                    zip: ''
                };
            }
        });
    }

    function initData() {
        const savedState = localStorage.getItem('betzaAppState');
        if (savedState) {
            const appState = JSON.parse(savedState);
            users = appState.users;
            clients = appState.clients;
            schedule = appState.schedule;
            
            // Run migration for clients and schedule
            migrateAddressData(clients);
            migrateAddressData(schedule);

            nextClientId = appState.nextClientId;
            nextUserId = appState.nextUserId;
            nextJobId = appState.nextJobId;
            timesheets = appState.timesheets;
            payAdjustments = appState.payAdjustments;
        } else {
            // Generate Test Data
            users = {
                1: { id: 1, username: 'Betza', password: 'password', role: 'admin', hourlyWage: 0 },
                2: { id: 2, username: 'employee1', password: 'password', role: 'user', hourlyWage: 20.50 },
                3: { id: 3, username: 'employee2', password: 'password', role: 'user', hourlyWage: 22.00 }
            };
            clients = {};
            schedule = [];
            timesheets = { 2: [], 3: [] };
            payAdjustments = {
                2: { vehicleUsageEnabled: true, vehicleUsageAmount: 15 },
                3: { vehicleUsageEnabled: false, vehicleUsageAmount: 0 }
            };
            nextClientId = 1;
            nextUserId = 4;
            nextJobId = 1;
            
            const firstNames = ["Leia", "Luke", "Han", "Ben", "Rey", "Finn", "Poe", "Chewbacca", "Lando", "Jyn"];
            const lastNames = ["Organa", "Skywalker", "Solo", "Kenobi", "Palpatine", "Dameron", "Calrissian", "Erso", "Fett", "Vader"];
            const cities = ["Denver", "Lakewood", "Aurora", "Centennial", "Arvada"];

            for(let i=0; i<10; i++){
                const newId = nextClientId++;
                clients[newId] = {
                    id: newId,
                    name: `${firstNames[i]} ${lastNames[i]}`,
                    phone: `(303) 555-01${i.toString().padStart(2,'0')}`,
                    recurrence: 'biweekly',
                    address: {
                        street: `${123 + i*10} Main St`,
                        apt: i % 3 === 0 ? `Apt ${i+1}`: '',
                        city: cities[i % cities.length],
                        state: 'CO',
                        zip: `${80201 + i}`
                    }
                }
            }

            const today = new Date();
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                const dateString = date.toISOString().split('T')[0];
                
                // Add 1 to 3 jobs per day
                for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
                    const client = clients[Math.floor(Math.random() * 10) + 1];
                    schedule.push({
                        id: nextJobId++,
                        date: dateString,
                        clientId: client.id,
                        clientName: client.name,
                        phone: client.phone,
                        price: Math.floor(Math.random() * 100) + 50,
                        time: `${Math.floor(Math.random() * 8) + 9}:00`,
                        tasks: "Standard Cleaning",
                        address: client.address,
                        isPaid: Math.random() > 0.5,
                        paymentMethod: 'Venmo',
                        paymentDate: new Date().toLocaleDateString(),
                        status: 'active'
                    });
                }
            }

            // Generate timesheet data for 2 employees for the past 2 weeks
            [2, 3].forEach(employeeId => {
                for (let i = 0; i < 14; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() - i);
                    // Skip weekends
                    if (date.getDay() === 0 || date.getDay() === 6) continue;
                    
                    const clockIn = new Date(date);
                    clockIn.setHours(9, Math.floor(Math.random() * 15), 0, 0); // Start between 9:00 - 9:14

                    const clockOut = new Date(date);
                    clockOut.setHours(17, Math.floor(Math.random() * 15), 0, 0); // End between 17:00 - 17:14

                    timesheets[employeeId].push({
                        clockIn: clockIn.toISOString(),
                        clockOut: clockOut.toISOString()
                    });
                }
            });
        }
    }

    const openModal = (modalElement) => modalElement?.classList.remove('hidden');
    const closeModal = (modalElement) => modalElement?.classList.add('hidden');

    const getTodayString = () => {
        const today = new Date();
        const offset = today.getTimezoneOffset();
        const localToday = new Date(today.getTime() - (offset * 60 * 1000));
        return localToday.toISOString().split('T')[0];
    };

    function showInfoModal(titleKey, messageKey) {
        infoModalTitle.textContent = translations[currentLang][titleKey] || titleKey;
        infoModalText.textContent = translations[currentLang][messageKey] || messageKey;
        openModal(infoModal);
    }

    function showScreen(screenId) {
        resetAllPasswordFields();
        Object.values(contentDivs).forEach(div => div.classList.add('hidden'));
        const targetContent = contentDivs[screenId];
        if (targetContent) {
            targetContent.classList.remove('hidden');
            updateRoleBasedViews();
            if(screenId === 'time-pay') {
                updateClockButtonState();
            }
            if(screenId === 'settings') {
                showSettingsSubView('settings-main-view');
            }
            if (screenId === 'clients') {
                clientSearchInput.value = '';
                renderClients();
            }
        }
        const titleKey = screenId;
        headerTitle.textContent = translations[currentLang][titleKey] || titleKey.charAt(0).toUpperCase() + titleKey.slice(1);
    }
    
    function updateRoleBasedViews() {
        if (!currentUser) return;
        const isAdmin = currentUser.role === 'admin';
        navClientsBtn.classList.toggle('hidden', !isAdmin);
        navEarningsBtn.classList.toggle('hidden', !isAdmin);
        settingsManageUsersBtn.classList.toggle('hidden', !isAdmin);
        
        document.querySelectorAll('[id$="-view"]').forEach(el => {
            if (el.id.includes('admin-')) {
                el.classList.toggle('hidden', !isAdmin);
            } else if (el.id.includes('user-')) {
                 el.classList.toggle('hidden', isAdmin);
            } else if (el.id.includes('common-')) {
                el.classList.toggle('hidden', isAdmin);
            }
        });
        renderSchedule();
    }

    function updateNav(targetId) {
         navButtons.forEach(btn => {
             btn.classList.remove('active-nav');
             if (btn.dataset.target === targetId) {
                 btn.classList.add('active-nav');
             }
         });
    }

    function completeLogin(user) {
        currentUser = user;
        closeModal(loginScreen);
        mainApp.classList.remove('hidden');
        mainApp.classList.add('flex');
        initializeApp();
    }
    
    function handleLogin() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const user = Object.values(users).find(u => u.username === username && u.password === password);
        if (user) {
           completeLogin(user);
        } else {
            loginError.classList.remove('hidden');
        }
    }

    function handleLogout() {
        stopTimer();
        currentUser = null;
        clockInTime = null;
        mainApp.classList.add('hidden');
        mainApp.classList.remove('flex');
        openModal(loginScreen);
        usernameInput.value = '';
        passwordInput.value = '';
        loginError.classList.add('hidden');
        resetAllPasswordFields();
        updateClockButtonState();
    }
    
    function updateClockButtonState() {
        if (!clockBtn) return;
        if (clockInTime) {
            clockBtn.textContent = translations[currentLang]?.clock_out;
            clockBtn.classList.remove('bg-green-500');
            clockBtn.classList.add('bg-red-500');
        } else {
            clockBtn.textContent = translations[currentLang]?.clock_in;
            clockBtn.classList.remove('bg-red-500');
            clockBtn.classList.add('bg-green-500');
        }
    }

    function initializeApp() {
        scheduleDatePicker.value = getTodayString();
        loadSettings();
        const storedClockInData = JSON.parse(localStorage.getItem('clockedInData'));
        if (storedClockInData && storedClockInData.userId === currentUser.id) {
            clockInTime = new Date(storedClockInData.time);
            startTimer();
        }
        
        populateWeekSelector();
        populateTimePicker();
        
        updateClockButtonState();
        updateRoleBasedViews(); 
        populateEmployeeDropdowns();
        renderContent();
        showScreen('schedule');
        updateNav('schedule');
    }
    
    function renderContent() {
        renderSchedule();
        renderTimeAndPay();
        if (currentUser.role === 'admin') {
            renderUsers();
            renderClients();
            renderEarnings();
            updateUnpaidIndicators();
        }
        applyLanguage(currentLang);
    }

    // --- RENDER FUNCTIONS ---
    function renderSchedule() {
        if(!contentDivs.schedule || !currentUser) return;

        if (currentUser.role === 'admin') {
            const todayString = getTodayString();
            const selectedDateString = scheduleDatePicker.value;
            addJobBtn.parentElement.classList.toggle('hidden', selectedDateString < todayString);
        }

        const selectedDate = scheduleDatePicker.value;
        const jobsForDate = schedule.filter(job => job.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time));

        const jobListHTML = jobsForDate.map(job => {
            const isAdmin = currentUser.role === 'admin';
            const isCanceled = job.status === 'canceled';
            
            let statusBadge = '';
            if (isCanceled) {
                statusBadge = `<span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200" data-translate-key="canceled">Canceled</span>`;
            } else if (isAdmin) { // Only show paid/unpaid for admin
                if (job.isPaid) {
                    statusBadge = `<span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200" data-translate-key="paid">Paid</span>`;
                } else {
                    statusBadge = `<span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200" data-translate-key="unpaid">Unpaid</span>`;
                }
            }

            const priceDisplay = isAdmin && job.price ? `<span class="font-bold text-primary">$${job.price.toFixed(2)}</span>` : '';
            const adminControls = isAdmin ? `
                <div class="flex items-center">
                  <button class="edit-job-btn text-blue-500 hover:text-blue-700 dark:text-blue-400 ml-2" data-job-id="${job.id}"><i class="fas fa-pencil-alt"></i></button>
                  <button class="cancel-job-btn text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 ml-2" data-job-id="${job.id}"><i class="fas fa-ban"></i></button>
                  <button class="delete-job-btn text-red-500 hover:text-red-700 dark:text-red-400 ml-2" data-job-id="${job.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            ` : '';
            const fullAddress = getFullAddressString(job.address);

            const cardClasses = isCanceled ? 'bg-gray-100 dark:bg-gray-800 opacity-60' : 'bg-white dark:bg-gray-700';
            const textClasses = isCanceled ? 'line-through' : '';

            return `
            <div class="${cardClasses} p-4 rounded-lg shadow border-l-4 ${isCanceled ? 'border-gray-400' : 'border-primary'}">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-bold text-dark dark:text-white ${textClasses}">${formatTime(job.time)} - ${job.clientName}</p>
                        ${priceDisplay ? `<p class="text-sm ${textClasses}">${priceDisplay}</p>` : ''}
                    </div>
                    <div class="flex items-center">
                        ${isAdmin && !isCanceled ? `<button class="toggle-paid-btn" data-job-id="${job.id}">${statusBadge}</button>` : statusBadge}
                    </div>
                </div>
                <div class="text-sm mt-1 space-y-1">
                    <a href="https://maps.google.com/?q=${encodeURIComponent(fullAddress)}" target="_blank" class="flex items-center text-blue-500 dark:text-blue-400 hover:underline ${textClasses}">
                        <i class="fas fa-map-marker-alt fa-fw mr-2"></i>
                        <span>${fullAddress}</span>
                    </a>
                    ${job.phone ? `
                    <a href="tel:${job.phone}" class="flex items-center text-blue-500 dark:text-blue-400 hover:underline ${textClasses}">
                        <i class="fas fa-phone fa-fw mr-2"></i>
                        <span>${job.phone}</span>
                    </a>` : ''}
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-2 ${textClasses}"><strong data-translate-key="tasks">Tasks:</strong> ${job.tasks || 'N/A'}</p>
                 ${isAdmin ? adminControls : ''}
            </div>
        `}).join('');

        const adminJobList = document.getElementById('admin-job-list');
        const userJobList = document.getElementById('user-job-list');
        const listContainer = currentUser.role === 'admin' ? adminJobList : userJobList;

        if (jobsForDate.length > 0) {
            listContainer.innerHTML = jobListHTML;
        } else {
            listContainer.innerHTML = '<p class="text-center text-gray-500 dark:text-gray-400">No jobs scheduled for this date.</p>';
        }

        (currentUser.role === 'admin' ? userJobList : adminJobList).innerHTML = '';

        document.querySelectorAll('.toggle-paid-btn').forEach(btn => btn.addEventListener('click', handleTogglePaid));
        document.querySelectorAll('.edit-job-btn').forEach(btn => btn.addEventListener('click', handleEditJobClick));
        document.querySelectorAll('.delete-job-btn').forEach(btn => btn.addEventListener('click', handleDeleteJobClick));
        document.querySelectorAll('.cancel-job-btn').forEach(btn => btn.addEventListener('click', handleCancelJobClick));
    }
    
    function renderUsers() {
        if (!userListDiv) return;
        const displayUsers = Object.values(users).filter(u => u.id !== currentUser.id);

        if (displayUsers.length === 0) {
            userListDiv.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400">No other users exist.</p>`;
            return;
        }

        userListDiv.innerHTML = displayUsers.map(user => {
            const roleKey = user.role === 'admin' ? 'administrator' : 'employee';
            return `
                <button class="user-tile text-left w-full bg-white dark:bg-gray-700 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition" data-user-id="${user.id}">
                    <p class="font-bold text-lg text-dark dark:text-white">${user.username}</p>
                    <p class="text-sm font-semibold ${user.role === 'admin' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}" data-translate-key="${roleKey}">${translations[currentLang][roleKey]}</p>
                </button>
            `
        }).join('');

        userListDiv.querySelectorAll('.user-tile').forEach(tile => {
            tile.addEventListener('click', (e) => openUserDetailsModal(e.currentTarget.dataset.userId));
        });
    }

    function renderClients(filteredClients = null) {
        if (!clientListDiv) return;
        
        const clientSource = filteredClients ? filteredClients : Object.values(clients);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const fourDaysAgo = new Date(today);
        fourDaysAgo.setDate(today.getDate() - 4);

        const clientArray = clientSource.map(client => {
            const clientJobs = schedule.filter(job => job.clientId == client.id && job.status !== 'canceled');
            const hasUnpaid = clientJobs.some(job => !job.isPaid);
            const hasOverdue = clientJobs.some(job => {
                const jobDate = new Date(job.date + 'T00:00:00');
                return !job.isPaid && jobDate < fourDaysAgo;
            });
            return { ...client, hasUnpaid, hasOverdue };
        });

        clientArray.sort((a, b) => {
            if (a.hasOverdue && !b.hasOverdue) return -1;
            if (!a.hasOverdue && b.hasOverdue) return 1;
            return a.name.localeCompare(b.name);
        });

        if (clientArray.length === 0) {
            clientListDiv.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400">No clients found.</p>`;
            return;
        }
        clientListDiv.innerHTML = clientArray.map(client => {
            const unpaidIndicator = client.hasUnpaid ? '<span class="unpaid-dot"></span>' : '';
            const overdueText = client.hasOverdue ? '<span class="text-xs font-semibold text-red-500 ml-2">(Overdue)</span>' : '';
            const overdueClass = client.hasOverdue ? 'bg-red-100 dark:bg-red-900/30' : 'bg-white dark:bg-gray-700';
            const recurrenceText = translateRecurrence(client.recurrence);
            return `
            <button class="client-tile text-left w-full ${overdueClass} p-4 rounded-lg shadow border-l-4 border-accent hover:bg-gray-50 dark:hover:bg-gray-600 transition" data-client-id="${client.id}">
                <div class="flex items-center">
                    <p class="font-bold text-dark dark:text-white">${client.name}</p>
                    ${unpaidIndicator}
                    ${overdueText}
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300">${getFullAddressString(client.address)}</p>
                <p class="text-xs font-semibold text-primary uppercase mt-1">${recurrenceText}</p>
            </button>
        `}).join('');

        clientListDiv.querySelectorAll('.client-tile').forEach(btn => btn.addEventListener('click', (e) => openClientDetailsModal(e.currentTarget.dataset.clientId)));
    }

    function renderEarnings() {
        if(currentUser.role !== 'admin') return;

        const activeJobs = schedule.filter(j => j.status !== 'canceled');

        const selectedDateStr = scheduleDatePicker.value;
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const {start: currentWeekStart, end: currentWeekEnd} = getWeekBoundaries(today);
        
        const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const currentNextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);

        // --- Income Calculation ---
        const paidJobsDay = activeJobs.filter(job => job.date === selectedDateStr && job.isPaid);
        const dayEarnings = paidJobsDay.reduce((sum, job) => sum + (job.price || 0), 0);
        
        const paidJobsWeek = activeJobs.filter(job => {
            const jobDate = new Date(job.date + 'T00:00:00');
            return jobDate >= currentWeekStart && jobDate < currentWeekEnd && job.isPaid;
        });
        const weekEarnings = paidJobsWeek.reduce((sum, job) => sum + (job.price || 0), 0);

        const paidJobsMonth = activeJobs.filter(job => {
            const jobDate = new Date(job.date + 'T00:00:00');
            return jobDate >= currentMonthStart && jobDate < currentNextMonthStart && job.isPaid;
        });
        const monthEarnings = paidJobsMonth.reduce((sum, job) => sum + (job.price || 0), 0);

        // --- Payroll Calculation ---
        let dayPayroll = 0, weekPayroll = 0, monthPayroll = 0;
        const employeeUsers = Object.values(users).filter(u => u.role === 'user');
        
        employeeUsers.forEach(user => {
            const userTimesheet = timesheets[user.id] || [];
            const weeksWorkedThisMonth = new Set();
            let workedThisWeek = false;

            userTimesheet.forEach(entry => {
                if (!entry.clockOut) return;

                const clockInDate = new Date(entry.clockIn);
                const clockInDateNormalized = new Date(clockInDate);
                clockInDateNormalized.setHours(0,0,0,0);
                
                const hours = (new Date(entry.clockOut) - clockInDate) / (1000 * 60 * 60);
                const entryPay = hours * user.hourlyWage;

                if (clockInDateNormalized.toISOString().split('T')[0] === selectedDateStr) dayPayroll += entryPay;
                if (clockInDateNormalized >= currentWeekStart && clockInDateNormalized < currentWeekEnd) {
                    weekPayroll += entryPay;
                    workedThisWeek = true;
                }
                if (clockInDateNormalized >= currentMonthStart && clockInDateNormalized < currentNextMonthStart) {
                    monthPayroll += entryPay;
                    const {start: entryWeekStart} = getWeekBoundaries(clockInDateNormalized);
                    weeksWorkedThisMonth.add(entryWeekStart.toISOString().split('T')[0]);
                }
            });

            const adjustments = payAdjustments[user.id];
            if (adjustments?.vehicleUsageEnabled && adjustments.vehicleUsageAmount > 0) {
                if (workedThisWeek) weekPayroll += adjustments.vehicleUsageAmount;
                monthPayroll += weeksWorkedThisMonth.size * adjustments.vehicleUsageAmount;
            }
        });

        // --- Net Income Calculation ---
        const dayNet = dayEarnings - dayPayroll;
        const weekNet = weekEarnings - weekPayroll;
        const monthNet = monthEarnings - monthPayroll;

        // --- Update DOM ---
        document.getElementById('day-earnings').textContent = `$${dayEarnings.toFixed(2)}`;
        document.getElementById('week-earnings').textContent = `$${weekEarnings.toFixed(2)}`;
        document.getElementById('month-earnings').textContent = `$${monthEarnings.toFixed(2)}`;
        
        document.getElementById('day-payroll').textContent = `-$${dayPayroll.toFixed(2)}`;
        document.getElementById('week-payroll').textContent = `-$${weekPayroll.toFixed(2)}`;
        document.getElementById('month-payroll').textContent = `-$${monthPayroll.toFixed(2)}`;
        
        document.getElementById('day-net').textContent = `$${dayNet.toFixed(2)}`;
        document.getElementById('week-net').textContent = `$${weekNet.toFixed(2)}`;
        document.getElementById('month-net').textContent = `$${monthNet.toFixed(2)}`;
        
        document.getElementById('day-jobs').textContent = paidJobsDay.length;
        document.getElementById('week-jobs').textContent = paidJobsWeek.length;
        document.getElementById('month-jobs').textContent = paidJobsMonth.length;
        
        [
            {el: document.getElementById('day-net'), val: dayNet},
            {el: document.getElementById('week-net'), val: weekNet},
            {el: document.getElementById('month-net'), val: monthNet}
        ].forEach(({el, val}) => {
            el.classList.remove('text-red-600', 'text-blue-600');
            el.classList.add(val < 0 ? 'text-red-600' : 'text-blue-600');
        });
    }
    
    function formatTime(input) {
        if (!input) return '';
        // Check if it's already in 12-hour format with AM/PM
        if (/^\d{1,2}:\d{2}\s(AM|PM)$/i.test(input)) {
            return input;
        }
        if (input instanceof Date) {
            let hours = input.getHours();
            let minutes = input.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            return `${hours}:${minutes} ${ampm}`;
        }
        if (typeof input === 'string' && input.includes(':')) {
            const [hours, minutes] = input.split(':');
            let h = parseInt(hours, 10);
            const ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12 || 12; 
            return `${h}:${minutes} ${ampm}`;
        }
        return input; 
    }

    function calculateTotalHours(userTimesheet) {
        if (!userTimesheet) return 0;
        return userTimesheet.reduce((total, entry) => {
            if (entry.clockIn && entry.clockOut) {
                const diff = (new Date(entry.clockOut) - new Date(entry.clockIn)) / (1000 * 60 * 60);
                return total + diff;
            }
            return total;
        }, 0);
    }
    
    function formatDateForDisplay(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        if (currentLang === 'es') {
            return date.toLocaleDateString('es-ES', options);
        }
        return date.toLocaleDateString('en-US', options);
    }
    
    function renderTimeAndPay(employeeId = null) {
        if (!currentUser) return;
        const isAdmin = currentUser.role === 'admin';
        const targetUserId = isAdmin ? (employeeId || document.getElementById('employee-select-time-pay').value) : currentUser.id;
        
        if (isAdmin && !targetUserId) {
            const logContainer = document.getElementById('admin-timesheet-log');
            const payContainer = document.getElementById('admin-pay-details');
            if (logContainer) logContainer.innerHTML = '<p class="text-center text-gray-500 dark:text-gray-400">No employees have been added yet.</p>';
            if (payContainer) payContainer.innerHTML = '';
            return;
        }

        let userTimesheet = [...(timesheets[targetUserId] || [])]; // Create a copy to sort
        
        // Sort timesheet entries chronologically
        userTimesheet.sort((a, b) => new Date(a.clockIn) - new Date(b.clockIn));

        const logContainer = isAdmin ? document.getElementById('admin-timesheet-log') : document.getElementById('user-timesheet-log');

        const weekSelector = isAdmin ? adminWeekSelect : weekSelect;
        if (weekSelector.value) {
            const [startDate, endDate] = weekSelector.value.split('_');
            userTimesheet = userTimesheet.filter(entry => {
                const entryDate = entry.clockIn.split('T')[0];
                return entryDate >= startDate && entryDate <= endDate;
            });
        }

        if (!logContainer) return;
        logContainer.innerHTML = userTimesheet.length > 0 ? userTimesheet.map((entry, index) => {
            const clockInDate = new Date(entry.clockIn);
            const clockOutDate = entry.clockOut ? new Date(entry.clockOut) : null;
            const duration = clockOutDate ? `${((clockOutDate - clockInDate) / (1000 * 60 * 60)).toFixed(2)} hrs` : 'Ongoing';
            const adminControls = isAdmin ? `<div class="flex space-x-4 mt-2 justify-end"><button class="edit-timesheet-btn text-blue-500 hover:text-blue-700 dark:text-blue-400 text-sm font-semibold" data-user-id="${targetUserId}" data-index="${index}"><i class="fas fa-pencil-alt fa-fw mr-1"></i><span data-translate-key="edit">Edit</span></button><button class="delete-timesheet-btn text-red-500 hover:text-red-700 text-sm font-semibold" data-user-id="${targetUserId}" data-index="${index}"><i class="fas fa-trash-alt fa-fw mr-1"></i><span data-translate-key="delete">Delete</span></button></div>` : '';
            return `
                <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2">
                    <div class="flex justify-between items-center">
                        <div><p class="font-semibold dark:text-white">${formatDateForDisplay(clockInDate)}</p><p class="text-sm text-gray-600 dark:text-gray-300">${formatTime(clockInDate)} - ${clockOutDate ? formatTime(clockOutDate) : '...'}</p></div>
                        <div class="font-bold text-primary">${duration}</div>
                    </div>
                    ${adminControls}
                </div>`;
        }).join('') : '<p class="text-center text-gray-500 dark:text-gray-400">No timesheet entries for this week.</p>';

        const totalHours = parseFloat(calculateTotalHours(userTimesheet).toFixed(2));
        if (!isAdmin) {
            document.getElementById('user-total-hours').textContent = totalHours.toFixed(2);
        }
        
        document.querySelectorAll('.edit-timesheet-btn').forEach(btn => btn.addEventListener('click', handleEditTimesheetClick));
        document.querySelectorAll('.delete-timesheet-btn').forEach(btn => btn.addEventListener('click', handleDeleteTimesheetClick));

        const targetUser = users[targetUserId];
        if (!targetUser) return;

        const basePay = totalHours * targetUser.hourlyWage;
        const vehiclePayData = payAdjustments[targetUserId] || { vehicleUsageEnabled: false, vehicleUsageAmount: 0 };
        const vehiclePay = vehiclePayData.vehicleUsageEnabled ? vehiclePayData.vehicleUsageAmount : 0;
        const totalPay = basePay + (userTimesheet.length > 0 ? vehiclePay : 0); // Only add vehicle pay if they worked that week

        const detailsHtml = `
            <div class="flex justify-between items-center py-2 border-b dark:border-gray-600"><span class="text-gray-600 dark:text-gray-300" data-translate-key="total_hours_worked">Total Hours Worked:</span><span class="font-bold text-dark dark:text-white">${totalHours.toFixed(2)} hrs</span></div>
            <div class="flex justify-between items-center py-2 border-b dark:border-gray-600"><span class="text-gray-600 dark:text-gray-300" data-translate-key="hourly_rate">Hourly Rate:</span><span class="font-bold text-dark dark:text-white">$${targetUser.hourlyWage.toFixed(2)} / hr</span></div>
            <div class="flex justify-between items-center py-2 border-b dark:border-gray-600"><span class="text-gray-600 dark:text-gray-300" data-translate-key="base_pay">Base Pay:</span><span class="font-bold text-dark dark:text-white">$${basePay.toFixed(2)}</span></div>
            <div class="flex justify-between items-center py-2 border-b dark:border-gray-600"><span class="text-gray-600 dark:text-gray-300" data-translate-key="vehicle_pay">Vehicle Usage Pay:</span><span class="font-bold text-dark dark:text-white">$${(userTimesheet.length > 0 ? vehiclePay : 0).toFixed(2)}</span></div>
            <div class="flex justify-between items-center pt-3 mt-2"><span class="font-bold text-lg text-dark dark:text-white" data-translate-key="total_pay">Estimated Total Pay:</span><span class="font-bold text-lg text-primary">$${totalPay.toFixed(2)}</span></div>`;

        const payContainer = isAdmin ? document.getElementById('admin-pay-details') : document.getElementById('user-pay-details');
        payContainer.innerHTML = detailsHtml;
        // The recursive call was here, it's now removed.
    }

    // --- HANDLER & MODAL FUNCTIONS ---
    function openUserDetailsModal(userId) {
        const user = users[userId];
        if (!user) return;

        userDetailsModalTitle.textContent = user.username;
        const isEmployee = user.role === 'user';
        const adj = isEmployee ? (payAdjustments[user.id] || { vehicleUsageEnabled: false, vehicleUsageAmount: 0 }) : null;

        userDetailsModalBody.innerHTML = `
            <div class="space-y-4" data-user-id="${user.id}">
                 <div>
                     <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" data-translate-key="username">Username</label>
                     <input type="text" value="${user.username}" class="user-name-input mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-600 dark:border-gray-500 dark:text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                 </div>
                 <div>
                     <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" data-translate-key="hourly_wage">Hourly Wage ($)</label>
                     <input type="number" step="0.01" value="${user.hourlyWage.toFixed(2)}" class="user-wage-input mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-600 dark:border-gray-500 dark:text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                 </div>
                 ${isEmployee ? `
                     <div class="flex items-center justify-between">
                         <span class="text-sm font-medium text-gray-700 dark:text-gray-300" data-translate-key="vehicle_pay">Vehicle Usage Pay</span>
                         <div class="relative inline-block w-10 mr-2 align-middle select-none">
                             <input type="checkbox" ${adj.vehicleUsageEnabled ? 'checked' : ''} class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer user-vehicle-toggle"/>
                             <label class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                         </div>
                     </div>
                     <div class="vehicle-amount-container ${adj.vehicleUsageEnabled ? '' : 'hidden'}">
                          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" data-translate-key="vehicle_pay_amount">Vehicle Pay Amount ($)</label>
                          <input type="number" step="0.01" value="${(adj.vehicleUsageAmount || 0).toFixed(2)}" class="user-vehicle-amount-input mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-600 dark:border-gray-500 dark:text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                     </div>
                 ` : ''}
                 <div class="mt-4 border-t dark:border-gray-600 pt-4 flex flex-col space-y-2">
                     <button class="reset-password-btn text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 font-semibold text-left" data-user-id="${user.id}">
                         <i class="fas fa-key mr-2"></i><span data-translate-key="reset_password">Reset Password</span>
                     </button>
                      <button class="delete-user-btn text-sm text-red-500 hover:text-red-700 font-semibold text-left" data-user-id="${user.id}">
                         <i class="fas fa-trash-alt mr-2"></i><span data-translate-key="delete_user">Delete User</span>
                     </button>
                 </div>
                 <p class="user-details-feedback text-sm text-center mt-2 text-red-500"></p>
                  <div class="text-right mt-4">
                     <span class="save-status text-green-600 text-sm italic hidden" data-translate-key="saved">Saved!</span>
                     <button class="save-user-changes-btn bg-primary text-white font-bold py-2 px-4 rounded-lg shadow hover:opacity-90 transition duration-300 hidden"><i class="fas fa-save mr-2"></i><span data-translate-key="save_changes">Save Changes</span></button>
                  </div>
             </div>
        `;

        const modalBody = userDetailsModalBody;
        modalBody.querySelectorAll('input, .toggle-checkbox').forEach(i => {
            i.addEventListener('input', showSaveButton);
            i.addEventListener('change', showSaveButton);
        });
        modalBody.querySelector('.save-user-changes-btn').addEventListener('click', handleSaveUserChanges);
        modalBody.querySelector('.delete-user-btn').addEventListener('click', handleDeleteUserClick);
        modalBody.querySelector('.reset-password-btn').addEventListener('click', handleResetPasswordClick);
        modalBody.querySelector('.user-vehicle-toggle')?.addEventListener('change', (e) => {
            modalBody.querySelector('.vehicle-amount-container').classList.toggle('hidden', !e.target.checked);
        });

        applyLanguage(currentLang);
        openModal(userDetailsModal);
    }
    
    function openClientDetailsModal(clientId) {
        const client = clients[clientId];
        if (!client) return;

        clientDetailsModalTitle.textContent = client.name;
        
        const clientJobs = schedule.filter(job => job.clientId == clientId)
                                       .sort((a,b) => new Date(b.date) - new Date(a.date)) 
                                       .slice(0, 5);
        
        let historyHtml = '<p class="text-center text-gray-500 dark:text-gray-400">No recent cleaning history.</p>';
        if(clientJobs.length > 0) {
            historyHtml = clientJobs.map(job => {
                let paymentInfoHtml;
                const jobPriceHtml = job.price ? `<span class="font-bold text-dark dark:text-white">$${job.price.toFixed(2)}</span>` : '';
                
                if (job.status === 'canceled') {
                    paymentInfoHtml = `<span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200" data-translate-key="canceled">Canceled</span>`;
                } else if (job.isPaid) {
                     paymentInfoHtml = `
                         <div class="text-right">
                             <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200" data-translate-key="paid">Paid</span>
                             <p class="text-xs text-gray-500 dark:text-gray-400">${job.paymentMethod} on ${job.paymentDate}</p>
                         </div>`;
                } else {
                    paymentInfoHtml = `<button class="mark-job-paid-from-client-btn text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200 hover:bg-red-300 transition" data-job-id="${job.id}" data-translate-key="unpaid">Unpaid</button>`;
                }

                const textClass = job.status === 'canceled' ? 'line-through' : '';

                return `<div class="flex justify-between items-center text-sm py-2 border-b dark:border-gray-600">
                            <div class="${textClass}">
                                <span class="text-gray-700 dark:text-gray-300">${new Date(job.date + 'T00:00:00').toLocaleDateString()}</span>
                                ${jobPriceHtml ? `<span class="ml-2">${jobPriceHtml}</span>` : ''}
                            </div>
                            ${paymentInfoHtml}
                        </div>`;
            }).join('');
        }
        const recurrenceText = translateRecurrence(client.recurrence);
        clientDetailsModalBody.innerHTML = `
            <div class="space-y-4" data-client-id="${client.id}">
                 <div>
                     <h4 class="text-md font-bold text-dark dark:text-white" data-translate-key="client_details">Client Details</h4>
                     <p class="text-sm text-gray-600 dark:text-gray-300">${getFullAddressString(client.address)}</p>
                     <p class="text-sm text-gray-600 dark:text-gray-400">${client.phone}</p>
                     <p class="text-xs font-semibold text-primary uppercase mt-1">${recurrenceText}</p>
                 </div>
                 <div class="mt-4 border-t dark:border-gray-600 pt-4">
                     <h4 class="text-md font-bold text-dark dark:text-white mb-2" data-translate-key="cleaning_history">Cleaning & Payment History</h4>
                     <div class="space-y-1">${historyHtml}</div>
                 </div>
                 <div class="mt-6 border-t dark:border-gray-600 pt-4 flex space-x-2">
                      <button class="edit-client-btn flex-1 text-sm bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg" data-client-id="${client.id}">
                         <i class="fas fa-pencil-alt mr-2"></i><span data-translate-key="edit_client">Edit Client</span>
                     </button>
                      <button class="delete-client-btn flex-1 text-sm bg-red-500 text-white font-semibold py-2 px-4 rounded-lg" data-client-id="${client.id}">
                         <i class="fas fa-trash-alt mr-2"></i><span data-translate-key="delete_user">Delete Client</span>
                     </button>
                 </div>
            </div>
        `;

        const modalBody = clientDetailsModalBody;
        modalBody.querySelector('.edit-client-btn').addEventListener('click', (e) => {
            closeModal(clientDetailsModal);
            openClientModal(e.currentTarget.dataset.clientId)
        });
        modalBody.querySelector('.delete-client-btn').addEventListener('click', (e) => {
            closeModal(clientDetailsModal);
            handleDeleteClientClick(e);
        });
        
        modalBody.querySelectorAll('.mark-job-paid-from-client-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobId = e.currentTarget.dataset.jobId;
                closeModal(clientDetailsModal);
                document.getElementById('payment-job-id').value = jobId;
                document.getElementById('payment-origin').value = 'clientDetails';
                openModal(paymentMethodModal);
            });
        });

        applyLanguage(currentLang);
        openModal(clientDetailsModal);
    }
    
    function openClientModal(clientId = null) {
        clientForm.reset();
        document.getElementById('client-id').value = clientId || '';
        document.getElementById('client-address-state').value = 'CO';

        if(clientId) {
            const client = clients[clientId];
            clientModalTitle.textContent = `Edit ${client.name}`;
            document.getElementById('client-name').value = client.name;
            document.getElementById('client-phone').value = client.phone;
            document.getElementById('client-recurrence').value = client.recurrence;
            if (client.address) {
                document.getElementById('client-address-street').value = client.address.street || '';
                document.getElementById('client-address-apt').value = client.address.apt || '';
                document.getElementById('client-address-city').value = client.address.city || '';
                document.getElementById('client-address-state').value = client.address.state || 'CO';
                document.getElementById('client-address-zip').value = client.address.zip || '';
            }
        } else {
            clientModalTitle.textContent = 'Add New Client';
        }
        applyLanguage(currentLang);
        openModal(clientModal);
    }

    function handleSaveClient(e) {
        e.preventDefault();
        const id = document.getElementById('client-id').value;
        const clientData = {
            name: document.getElementById('client-name').value,
            phone: document.getElementById('client-phone').value,
            recurrence: document.getElementById('client-recurrence').value,
            address: {
                street: document.getElementById('client-address-street').value,
                apt: document.getElementById('client-address-apt').value,
                city: document.getElementById('client-address-city').value,
                state: document.getElementById('client-address-state').value,
                zip: document.getElementById('client-address-zip').value,
            }
        };
        if (id) {
            clients[id] = { ...clients[id], ...clientData };
        } else {
            const newId = nextClientId++;
            clients[newId] = { id: newId, ...clientData };
        }
        renderClients();
        closeModal(clientModal);
        saveState();
    }

    function handleDeleteClientClick(e) {
        const clientId = e.currentTarget.dataset.clientId;
        itemToDelete = { type: 'client', id: clientId };
        confirmDeleteText.textContent = `This will permanently delete the client '${clients[clientId].name}' and all associated jobs. This action cannot be undone.`;
        openModal(confirmDeleteModal);
    }
    
    function handleDeleteJobClick(e) {
        const jobId = e.currentTarget.dataset.jobId;
        const job = schedule.find(j => j.id == jobId);
        itemToDelete = { type: 'job', id: jobId, element: e.currentTarget.closest('.bg-white, .bg-gray-100') };
        confirmDeleteText.textContent = `Are you sure you want to delete the job for '${job.clientName}' on ${job.date}? This cannot be undone.`;
        openModal(confirmDeleteModal);
    }

    function handleCancelJobClick(e) {
        const jobId = e.currentTarget.dataset.jobId;
        const job = schedule.find(j => j.id == jobId);
        if (job) {
            job.status = job.status === 'canceled' ? 'active' : 'canceled';
            renderSchedule();
            updateUnpaidIndicators();
            saveState();
        }
    }


    function handleAddNewUser(e) {
        e.preventDefault();
        addUserError.classList.add('hidden');
        const username = document.getElementById('newUsername').value.trim();
        const password = document.getElementById('newPassword').value;
        const role = document.getElementById('newRole').value;
        let hourlyWage = parseFloat(document.getElementById('newHourlyWage').value);

        if (role === 'admin') hourlyWage = 0;

        if (!username || !password || (role === 'user' && isNaN(hourlyWage)) ) {
            addUserError.textContent = 'Please fill out all required fields.';
            addUserError.classList.remove('hidden');
            return;
        }
        if (Object.values(users).some(u => u.username.toLowerCase() === username.toLowerCase())) {
            addUserError.textContent = 'Username already exists.';
            addUserError.classList.remove('hidden');
            return;
        }
        users[nextUserId] = { id: nextUserId, username, password, role, hourlyWage };
        if (role === 'user') {
            payAdjustments[nextUserId] = { vehicleUsageEnabled: false, vehicleUsageAmount: 0 };
        }
        nextUserId++;
        renderUsers();
        populateEmployeeDropdowns();
        addUserForm.reset();
        addUserContainer.classList.add('hidden');
        saveState();
    }

    function populateEmployeeDropdowns() {
        const employeeUsers = Object.values(users).filter(u => u.role === 'user');
        const timePaySelect = document.getElementById('employee-select-time-pay');
        
        if (!timePaySelect) return;

        const currentTimePayVal = timePaySelect.value;
        timePaySelect.innerHTML = employeeUsers.map(user => `<option value="${user.id}">${user.username}</option>`).join('');
        timePaySelect.value = currentTimePayVal || employeeUsers[0]?.id;
    }

    function handleClocking() {
        if (clockInTime) {
            const clockOutTime = new Date();
            if (!timesheets[currentUser.id]) timesheets[currentUser.id] = [];
            timesheets[currentUser.id].push({ clockIn: clockInTime.toISOString(), clockOut: clockOutTime.toISOString() });
            clockInTime = null;
            stopTimer();
            localStorage.removeItem('clockedInData');
            updateClockButtonState();
            renderTimeAndPay();
        } else {
            clockInTime = new Date();
            localStorage.setItem('clockedInData', JSON.stringify({ userId: currentUser.id, time: clockInTime.toISOString() }));
            startTimer();
            updateClockButtonState();
        }
        saveState();
    }

    function startTimer() {
        if(shiftTimerInterval) clearInterval(shiftTimerInterval);
        shiftTimerDisplay.classList.remove('hidden');
        shiftTimerInterval = setInterval(() => {
            const diff = new Date() - clockInTime;
            const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
            const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
            const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
            shiftTimerDisplay.textContent = `${h}:${m}:${s}`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(shiftTimerInterval);
        shiftTimerInterval = null;
        shiftTimerDisplay.classList.add('hidden');
        shiftTimerDisplay.textContent = '00:00:00';
    }

    function handleSaveJob(e) {
        e.preventDefault();
        const jobId = document.getElementById('job-id').value;
        const clientId = document.getElementById('job-client-id').value;
        
        if (!clientId) {
            showInfoModal('Client Needed', 'Please select a client.');
            return;
        }
        
        const client = clients[clientId];
        
        const jobData = {
            date: scheduleDatePicker.value,
            clientId: clientId,
            clientName: client.name,
            phone: client.phone,
            price: parseFloat(document.getElementById('jobPrice').value) || 0,
            time: jobTimeInput.dataset.time24,
            tasks: document.getElementById('jobTasks').value,
            address: {
                street: document.getElementById('job-address-street').value,
                apt: document.getElementById('job-address-apt').value,
                city: document.getElementById('job-address-city').value,
                state: document.getElementById('job-address-state').value,
                zip: document.getElementById('job-address-zip').value,
            },
            status: 'active'
        };
        
        if (jobId) {
            const jobIndex = schedule.findIndex(j => j.id == jobId);
            if (jobIndex > -1) {
               schedule[jobIndex] = { ...schedule[jobIndex], ...jobData };
            }
        } else {
            schedule.push({ id: nextJobId++, ...jobData, isPaid: false });
        }

        renderSchedule();
        updateUnpaidIndicators();
        closeModal(addJobModal);
        addJobForm.reset();
        saveState();
    }

    function showSaveButton(event) {
        const card = event.target.closest('[data-user-id]');
        if (card) {
            card.querySelector('.save-user-changes-btn').classList.remove('hidden');
            card.querySelector('.save-status').classList.add('hidden');
        }
    }

    function handleSaveUserChanges(event) {
        const cardBody = event.target.closest('[data-user-id]');
        const userId = cardBody.dataset.userId;
        const user = users[userId];
        const feedback = cardBody.querySelector('.user-details-feedback');
        feedback.textContent = ''; 

        const newUsername = cardBody.querySelector('.user-name-input').value.trim();

        if (!newUsername) {
            feedback.textContent = "Username cannot be empty.";
            return;
        }
        
        if (Object.values(users).some(u => u.username.toLowerCase() === newUsername.toLowerCase() && u.id != userId)) {
            feedback.textContent = "Username already exists.";
            return;
        }
        
        user.username = newUsername;
        user.hourlyWage = parseFloat(cardBody.querySelector('.user-wage-input').value);

        if (user.role === 'user') {
            const toggle = cardBody.querySelector('.user-vehicle-toggle');
            const amountInput = cardBody.querySelector('.user-vehicle-amount-input');
            payAdjustments[userId] = {
                vehicleUsageEnabled: toggle?.checked || false,
                vehicleUsageAmount: amountInput ? parseFloat(amountInput.value) : 0
            };
        }
        
        cardBody.querySelector('.save-user-changes-btn').classList.add('hidden');
        const status = cardBody.querySelector('.save-status');
        status.classList.remove('hidden');
        setTimeout(() => {
            status.classList.add('hidden');
            closeModal(userDetailsModal);
            renderUsers();
            populateEmployeeDropdowns();
        }, 1500);
        
        if (document.getElementById('employee-select-time-pay').value === userId) {
            renderTimeAndPay(userId);
        }
        saveState();
    }

    function handleDeleteUserClick(event) {
        itemToDelete = { type: 'user', id: event.currentTarget.dataset.userId };
        confirmDeleteText.textContent = `This will permanently delete the user '${users[itemToDelete.id].username}'. This action cannot be undone.`;
        closeModal(userDetailsModal);
        openModal(confirmDeleteModal);
    }

    function handleEditTimesheetClick(event) {
        const { userId, index } = event.currentTarget.dataset;
        const entry = timesheets[userId][index];
        timesheetModalTitle.textContent = `${translations[currentLang].edit_time_entry} for ${users[userId].username}`;
        timesheetEntryIndexInput.value = index;
        const clockIn = new Date(entry.clockIn);
        const clockOut = entry.clockOut ? new Date(entry.clockOut) : null;
        document.getElementById('entryDate').value = clockIn.toISOString().split('T')[0];
        document.getElementById('entryClockIn').value = clockIn.toTimeString().substring(0, 5);
        document.getElementById('entryClockOut').value = clockOut ? clockOut.toTimeString().substring(0, 5) : '';
        openModal(timesheetEditModal);
    }
    
    function handleAddManualEntryClick() {
        const selectedUserId = document.getElementById('employee-select-time-pay').value;
        if (!selectedUserId) {
            showInfoModal('Error', 'Please select an employee first.');
            return;
        }
        timesheetModalTitle.textContent = `${translations[currentLang].add_manual_entry} for ${users[selectedUserId].username}`;
        timesheetEditForm.reset();
        timesheetEntryIndexInput.value = -1;
        openModal(timesheetEditModal);
    }

    function handleDeleteTimesheetClick(event) {
        const { userId, index } = event.currentTarget.dataset;
        itemToDelete = { type: 'timesheet', userId, index };
        confirmDeleteText.textContent = translations[currentLang].are_you_sure;
        openModal(confirmDeleteModal);
    }
    
    function handleConfirmDelete() {
        if (itemToDelete.type === 'user') {
            delete users[itemToDelete.id];
            delete timesheets[itemToDelete.id];
            delete payAdjustments[itemToDelete.id];
            renderUsers();
            populateEmployeeDropdowns();
        } else if (itemToDelete.type === 'timesheet') {
            timesheets[itemToDelete.userId].splice(itemToDelete.index, 1);
            renderTimeAndPay();
        } else if (itemToDelete.type === 'client') {
            const clientId = itemToDelete.id;
            delete clients[clientId];
            schedule = schedule.filter(job => job.clientId != clientId); // Also delete jobs for this client
            renderClients();
            renderSchedule();
        } else if (itemToDelete.type === 'job') {
            const jobIndex = schedule.findIndex(j => j.id == itemToDelete.id);
            if(jobIndex > -1) {
                schedule.splice(jobIndex, 1);
            }
            renderSchedule();
            updateUnpaidIndicators();
        }
        closeModal(confirmDeleteModal);
        itemToDelete = { type: null, id: null };
        saveState();
    }

    function handleSaveTimesheetOverride(event) {
        event.preventDefault();
        const selectedUserId = document.getElementById('employee-select-time-pay').value;
        const index = parseInt(timesheetEntryIndexInput.value);
        const date = document.getElementById('entryDate').value;
        const clockInTimeValue = document.getElementById('entryClockIn').value;
        const clockOutTimeValue = document.getElementById('entryClockOut').value;
        if (!date || !clockInTimeValue || !clockOutTimeValue) {
            showInfoModal('Missing Information', 'Please fill in all date and time fields.');
            return;
        }
        const newEntry = {
            clockIn: new Date(`${date}T${clockInTimeValue}`).toISOString(),
            clockOut: new Date(`${date}T${clockOutTimeValue}`).toISOString()
        };
        if (index === -1) {
            if (!timesheets[selectedUserId]) timesheets[selectedUserId] = [];
            timesheets[selectedUserId].push(newEntry);
        } else {
            timesheets[selectedUserId][index] = newEntry;
        }
        renderTimeAndPay();
        closeModal(timesheetEditModal);
        saveState();
    }

    function handleResetPasswordClick(event) {
        const userId = event.currentTarget.dataset.userId;
        const modalTitle = document.getElementById('password-reset-modal-title');
        document.getElementById('reset-user-id').value = userId;
        modalTitle.textContent = `${translations[currentLang].reset_password} for ${users[userId].username}`;
        document.getElementById('password-reset-feedback').textContent = '';
        passwordResetForm.reset();
        closeModal(userDetailsModal);
        openModal(passwordResetModal);
    }

    function handleSavePasswordOverride(event) {
        event.preventDefault();
        const userId = document.getElementById('reset-user-id').value;
        const p1 = document.getElementById('resetPassword1');
        const p2 = document.getElementById('resetPassword2');
        const feedback = document.getElementById('password-reset-feedback');
        if (p1.value !== p2.value) {
            feedback.textContent = translations[currentLang].password_mismatch;
            feedback.className = 'text-sm text-center mt-4 text-red-500';
            return;
        }
        if (p1.value.length < 6) {
            feedback.textContent = translations[currentLang].password_short;
            feedback.className = 'text-sm text-center mt-4 text-red-500';
            return;
        }
        users[userId].password = p1.value;
        feedback.textContent = translations[currentLang].password_success;
        feedback.className = 'text-sm text-center mt-4 text-green-600';
        setTimeout(() => {
            closeModal(passwordResetModal);
            passwordResetForm.reset();
        }, 2000);
        saveState();
    }

    function handleEditJobClick(e) {
        const jobId = e.currentTarget.dataset.jobId;
        openAddJobModal(jobId);
    }
    
    function openAddJobModal(jobId = null) {
        addJobForm.reset();
        document.getElementById('job-id').value = jobId || '';
        document.getElementById('job-address-state').value = 'CO';
        const modalTitle = document.getElementById('add-job-modal-title');
        const jobPriceWrapper = document.getElementById('job-price-wrapper');

        jobPriceWrapper.classList.toggle('hidden', currentUser.role !== 'admin');

        if (jobId) {
            modalTitle.textContent = 'Edit Job';
            const job = schedule.find(j => j.id == jobId);
            
            // Set client search
            const client = clients[job.clientId];
            document.getElementById('job-client-search').value = client ? client.name : '';
            document.getElementById('job-client-id').value = job.clientId || '';

            jobTimeInput.value = formatTime(job.time);
            jobTimeInput.dataset.time24 = job.time;
            document.getElementById('jobTasks').value = job.tasks;
            if (job.address) {
                document.getElementById('job-address-street').value = job.address.street || '';
                document.getElementById('job-address-apt').value = job.address.apt || '';
                document.getElementById('job-address-city').value = job.address.city || '';
                document.getElementById('job-address-state').value = job.address.state || 'CO';
                document.getElementById('job-address-zip').value = job.address.zip || '';
            }
            if(currentUser.role === 'admin') {
                document.getElementById('jobPrice').value = job.price ? job.price.toFixed(2) : '0.00';
            }
        } else {
            modalTitle.textContent = 'Add New Job';
        }
        applyLanguage(currentLang);
        openModal(addJobModal);
    }

    function handleSavePayment(e) {
        e.preventDefault();
        const jobId = document.getElementById('payment-job-id').value;
        const origin = document.getElementById('payment-origin').value;
        const job = schedule.find(j => j.id == jobId);
        if (job) {
            job.isPaid = true;
            job.paymentMethod = document.getElementById('payment-method').value;
            job.paymentDate = new Date().toLocaleDateString();
            
            closeModal(paymentMethodModal);

            renderSchedule();
            updateUnpaidIndicators();
            renderEarnings();
            
            if (origin === 'clientDetails') {
                openClientDetailsModal(job.clientId); 
            }
        } else {
             closeModal(paymentMethodModal);
        }
        document.getElementById('payment-origin').value = '';
        saveState();
    }

    function updateUnpaidIndicators() {
        if(currentUser?.role !== 'admin') return;
        const unpaidCount = schedule.filter(job => !job.isPaid && job.status !== 'canceled').length;
        const badge = document.getElementById('unpaid-jobs-badge');
        if (unpaidCount > 0) {
            badge.textContent = unpaidCount;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
        renderClients();
    }

     // --- SETTINGS & UI FUNCTIONS ---
    function showSettingsSubView(targetId) {
        document.getElementById('settings-main-view').classList.add('hidden');
        document.querySelectorAll('.settings-sub-view').forEach(view => view.classList.add('hidden'));
        const targetView = document.getElementById(targetId);
        if (targetView) targetView.classList.remove('hidden');
    }
    
    function translateRecurrence(recurrenceKey) {
        const keyMap = {
            'one-time': 'recurrence_one_time', 'weekly': 'recurrence_weekly',
            'biweekly': 'recurrence_biweekly', 'three-weeks': 'recurrence_three_weeks',
            'monthly': 'recurrence_monthly'
        };
        const translationKey = keyMap[recurrenceKey] || recurrenceKey;
        return translations[currentLang][translationKey] || recurrenceKey;
    }

    function applyLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        const activeNav = document.querySelector('.nav-btn.active-nav');
        if(currentUser && activeNav) {
             const key = activeNav.dataset.target;
             headerTitle.textContent = translations[lang][key] || key.charAt(0).toUpperCase() + key.slice(1);
        }
        document.getElementById('lang-en-btn').classList.toggle('bg-primary', lang === 'en');
        document.getElementById('lang-en-btn').classList.toggle('text-white', lang === 'en');
        document.getElementById('lang-es-btn').classList.toggle('bg-primary', lang === 'es');
        document.getElementById('lang-es-btn').classList.toggle('text-white', lang === 'es');
        localStorage.setItem('betzaAppLang', lang);
        
        if (currentUser) {
            updateClockButtonState();
            // The recursive calls were here, they are now removed.
        }
    }

    function applyTheme(theme) {
        currentTheme = theme;
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.getElementById('theme-toggle').checked = theme === 'dark';
        localStorage.setItem('betzaAppTheme', theme);
    }

    function loadSettings() {
        applyLanguage(localStorage.getItem('betzaAppLang') || 'en');
        applyTheme(localStorage.getItem('betzaAppTheme') || 'light');
    }

    function handleChangePassword(e) {
        e.preventDefault();
        const p1 = document.getElementById('newPassword1'), p2 = document.getElementById('newPassword2');
        const feedback = document.getElementById('password-feedback');
        if (p1.value !== p2.value) {
            feedback.textContent = translations[currentLang].password_mismatch;
            feedback.className = 'text-sm text-center mt-2 text-red-500';
            return;
        }
        if (p1.value.length < 6) {
            feedback.textContent = translations[currentLang].password_short;
             feedback.className = 'text-sm text-center mt-2 text-red-500';
            return;
        }
        users[currentUser.id].password = p1.value;
        feedback.textContent = translations[currentLang].password_success;
        feedback.className = 'text-sm text-center mt-2 text-green-600';
        p1.value = ''; p2.value = '';
        setTimeout(() => feedback.textContent = '', 3000);
        saveState();
    }
    
    function formatPhoneNumber(e) {
        const input = e.target;
        const value = input.value.replace(/\D/g, '').substring(0, 10);
        const size = value.length;
        if (size === 0) input.value = '';
        else if (size < 4) input.value = `(${value}`;
        else if (size < 7) input.value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
        else input.value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
    }

    function handleTogglePaid(event) {
        if (currentUser.role !== 'admin') return;
        const jobId = event.currentTarget.dataset.jobId;
        const job = schedule.find(j => j.id == jobId);
        if (job) {
            if (job.isPaid) {
                job.isPaid = false;
                job.paymentMethod = null;
                job.paymentDate = null;
                renderSchedule();
                updateUnpaidIndicators();
                renderEarnings();
            } else {
                document.getElementById('payment-job-id').value = jobId;
                document.getElementById('payment-origin').value = 'schedule';
                openModal(paymentMethodModal);
            }
            saveState();
        }
    }
    
    function resetAllPasswordFields() {
        document.querySelectorAll('.password-toggle-btn').forEach(button => {
            const input = button.previousElementSibling;
            const icon = button.querySelector('i');
            if (input && input.type === 'text') {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    function togglePasswordVisibility(button) {
        const input = button.previousElementSibling;
        const icon = button.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    function getWeekBoundaries(date) {
        const start = new Date(date);
        const dayOfWeek = start.getDay(); 
        const offset = (dayOfWeek === 0) ? 6 : dayOfWeek - 1; // 0 is Sunday, 1 is Monday...
        start.setDate(start.getDate() - offset);
        start.setHours(0,0,0,0);
        const end = new Date(start);
        end.setDate(start.getDate() + 7);
        return { start, end };
    }

    function getWeekRanges(numberOfWeeks) {
        const ranges = [];
        for (let i = 0; i < numberOfWeeks; i++) {
            const date = new Date();
            date.setDate(date.getDate() - (i * 7));
            const {start, end} = getWeekBoundaries(date);
            
            const options = { month: 'short', day: 'numeric' };
            const text = `${start.toLocaleDateString('en-US', options)} - ${new Date(end.getTime() - 1).toLocaleDateString('en-US', { ...options, year: 'numeric' })}`;
            const value = `${start.toISOString().split('T')[0]}_${new Date(end.getTime() - 1).toISOString().split('T')[0]}`;
            ranges.push({ text, value });
        }
        return ranges;
    }

    function populateWeekSelector() {
        if (!weekSelect || !adminWeekSelect) return;
        const weeks = getWeekRanges(12);
        const optionsHtml = weeks.map(week => `<option value="${week.value}">${week.text}</option>`).join('');
        weekSelect.innerHTML = optionsHtml;
        adminWeekSelect.innerHTML = optionsHtml;
    }

    function populateTimePicker() {
        const hourSelect = document.getElementById('time-picker-hour');
        const minuteSelect = document.getElementById('time-picker-minute');
        for (let i = 1; i <= 12; i++) {
            hourSelect.innerHTML += `<option>${i}</option>`;
        }
        for (let i = 0; i < 60; i+=5) {
            minuteSelect.innerHTML += `<option>${i.toString().padStart(2, '0')}</option>`;
        }
    }


    // --- EVENT LISTENERS ---
    document.body.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('.password-toggle-btn');
        if (toggleBtn) togglePasswordVisibility(toggleBtn);
    });

    loginBtn.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleLogin());
    
    navButtons.forEach(button => button.addEventListener('click', () => {
        const target = button.dataset.target;
        showScreen(target);
        updateNav(target);
        if(target === 'earnings') renderEarnings();
    }));

    clockBtn.addEventListener('click', handleClocking);
    document.getElementById('employee-select-time-pay').addEventListener('change', (e) => renderTimeAndPay(e.target.value));
    
    addJobBtn.addEventListener('click', () => openAddJobModal());
    document.getElementById('cancel-job-btn').addEventListener('click', () => closeModal(addJobModal));
    addJobForm.addEventListener('submit', handleSaveJob);

    addUserForm.addEventListener('submit', handleAddNewUser);
    showAddUserFormBtn.addEventListener('click', () => addUserContainer.classList.toggle('hidden'));
    
    addManualEntryBtn.addEventListener('click', handleAddManualEntryClick);
    document.getElementById('cancel-timesheet-edit-btn').addEventListener('click', () => closeModal(timesheetEditModal));
    timesheetEditForm.addEventListener('submit', handleSaveTimesheetOverride);
    
    cancelDeleteBtn.addEventListener('click', () => closeModal(confirmDeleteModal));
    confirmDeleteBtn.addEventListener('click', handleConfirmDelete);
    
    document.getElementById('lang-en-btn').addEventListener('click', () => { applyLanguage('en'); if(currentUser) renderContent(); });
    document.getElementById('lang-es-btn').addEventListener('click', () => { applyLanguage('es'); if(currentUser) renderContent(); });
    
    document.getElementById('theme-toggle').addEventListener('change', e => applyTheme(e.target.checked ? 'dark' : 'light'));
    
    document.getElementById('change-password-form').addEventListener('submit', handleChangePassword);
    
    passwordResetForm.addEventListener('submit', handleSavePasswordOverride);
    document.getElementById('cancel-password-reset-btn').addEventListener('click', () => closeModal(passwordResetModal));

    document.getElementById('close-user-details-modal').addEventListener('click', () => closeModal(userDetailsModal));
    
    document.getElementById('add-client-btn').addEventListener('click', () => openClientModal());
    document.getElementById('cancel-client-btn').addEventListener('click', () => closeModal(clientModal));
    clientForm.addEventListener('submit', handleSaveClient);
    
    const clientSearch = document.getElementById('job-client-search');
    const clientSuggestions = document.getElementById('job-client-suggestions');

    clientSearch.addEventListener('input', () => {
        const query = clientSearch.value.toLowerCase();
        clientSuggestions.innerHTML = '';
        if (query.length > 0) {
            const filtered = Object.values(clients).filter(c => c.name.toLowerCase().includes(query));
            if (filtered.length > 0) {
                filtered.forEach(client => {
                    const div = document.createElement('div');
                    div.textContent = client.name;
                    div.className = 'p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer';
                    div.onclick = () => {
                        clientSearch.value = client.name;
                        document.getElementById('job-client-id').value = client.id;
                        clientSuggestions.classList.add('hidden');
                        
                        // Auto-populate address
                        const clientData = clients[client.id];
                        if (clientData && clientData.address) {
                            document.getElementById('job-address-street').value = clientData.address.street || '';
                            document.getElementById('job-address-apt').value = clientData.address.apt || '';
                            document.getElementById('job-address-city').value = clientData.address.city || '';
                            document.getElementById('job-address-state').value = clientData.address.state || 'CO';
                            document.getElementById('job-address-zip').value = clientData.address.zip || '';
                        }
                    };
                    clientSuggestions.appendChild(div);
                });
                clientSuggestions.classList.remove('hidden');
            } else {
                clientSuggestions.classList.add('hidden');
            }
        } else {
            clientSuggestions.classList.add('hidden');
        }
    });

    document.addEventListener('click', (e) => {
        if (!clientSearch.contains(e.target) && !clientSuggestions.contains(e.target)) {
            clientSuggestions.classList.add('hidden');
        }
    });
    
    document.getElementById('newRole').addEventListener('change', (e) => {
        document.getElementById('new-hourly-wage-wrapper').classList.toggle('hidden', e.target.value === 'admin');
    });
    
    document.getElementById('client-phone').addEventListener('input', formatPhoneNumber);
    document.getElementById('close-client-details-modal').addEventListener('click', () => closeModal(clientDetailsModal));
    
    paymentForm.addEventListener('submit', handleSavePayment);
    document.getElementById('cancel-payment-btn').addEventListener('click', () => closeModal(paymentMethodModal));
    
    document.getElementById('info-modal-ok-btn').addEventListener('click', () => closeModal(infoModal));

    scheduleDatePicker.addEventListener('change', () => {
        renderSchedule();
        renderEarnings();
        applyLanguage(currentLang);
    });

    document.querySelectorAll('.settings-menu-btn').forEach(btn => btn.addEventListener('click', () => showSettingsSubView(btn.dataset.target)));
    document.querySelectorAll('.settings-back-btn').forEach(btn => btn.addEventListener('click', () => showSettingsSubView('settings-main-view')));
    settingsLogoutBtn.addEventListener('click', handleLogout);
    
    weekSelect.addEventListener('change', () => renderTimeAndPay());
    adminWeekSelect.addEventListener('change', () => renderTimeAndPay());

    clientSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = Object.values(clients).filter(client => client.name.toLowerCase().includes(searchTerm));
        renderClients(filtered);
    });

    jobTimeInput.addEventListener('click', () => openModal(timePickerModal));
    document.getElementById('cancel-time-picker-btn').addEventListener('click', () => closeModal(timePickerModal));
    document.getElementById('save-time-picker-btn').addEventListener('click', () => {
        const hour = document.getElementById('time-picker-hour').value;
        const minute = document.getElementById('time-picker-minute').value;
        const ampm = document.getElementById('time-picker-ampm').value;
        
        jobTimeInput.value = `${hour}:${minute} ${ampm}`;

        let hour24 = parseInt(hour, 10);
        if (ampm === 'PM' && hour24 !== 12) hour24 += 12;
        if (ampm === 'AM' && hour24 === 12) hour24 = 0;

        jobTimeInput.dataset.time24 = `${hour24.toString().padStart(2,'0')}:${minute}`;
        
        closeModal(timePickerModal);
    });
    
    // --- Init Call ---
    initData();
    loadSettings();
});
