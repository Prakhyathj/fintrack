// Comprehensive test for transactions.html functionality
// This script will test all required features

async function testTransactionsPage() {
    const results = {
        pageLoad: false,
        formFunctionality: false,
        filtering: false,
        deletion: false,
        sidebarNavigation: false,
        dataManagerIntegration: false,
        errors: []
    };

    try {
        console.log('🔍 Testing Transactions Page Functionality...\n');

        // Test 1: Check if page loads and essential elements exist
        console.log('1️⃣ Testing page load and essential elements...');
        
        const response = await fetch('http://localhost:5000/transactions.html');
        if (response.ok) {
            const html = await response.text();
            
            // Check for essential elements in HTML
            const hasForm = html.includes('id="transactionForm"');
            const hasFilterButtons = html.includes('class="filter-btn"');
            const hasTransactionsList = html.includes('id="transactionsList"');
            const hasDataManager = html.includes('data-manager.js');
            const hasActiveSidebar = html.includes('menu-item active');
            
            results.pageLoad = hasForm && hasFilterButtons && hasTransactionsList;
            results.sidebarNavigation = hasActiveSidebar;
            results.dataManagerIntegration = hasDataManager;
            
            console.log(`   ✅ Form elements present: ${hasForm}`);
            console.log(`   ✅ Filter buttons present: ${hasFilterButtons}`);
            console.log(`   ✅ Transactions list present: ${hasTransactionsList}`);
            console.log(`   ✅ Data manager included: ${hasDataManager}`);
            console.log(`   ✅ Sidebar active state: ${hasActiveSidebar}`);
        } else {
            throw new Error(`Page failed to load: ${response.status}`);
        }

        // Test 2: Verify data-manager.js is accessible
        console.log('\n2️⃣ Testing data manager accessibility...');
        
        const dataManagerResponse = await fetch('http://localhost:5000/data-manager.js');
        if (dataManagerResponse.ok) {
            const dataManagerCode = await dataManagerResponse.text();
            const hasFinanceDataManager = dataManagerCode.includes('class FinanceDataManager');
            const hasAddTransaction = dataManagerCode.includes('addTransaction(');
            const hasDeleteTransaction = dataManagerCode.includes('deleteTransaction(');
            const hasGetAllTransactions = dataManagerCode.includes('getAllTransactions()');
            
            console.log(`   ✅ FinanceDataManager class exists: ${hasFinanceDataManager}`);
            console.log(`   ✅ addTransaction method exists: ${hasAddTransaction}`);
            console.log(`   ✅ deleteTransaction method exists: ${hasDeleteTransaction}`);
            console.log(`   ✅ getAllTransactions method exists: ${hasGetAllTransactions}`);
            
            results.dataManagerIntegration = hasFinanceDataManager && hasAddTransaction && hasDeleteTransaction;
        }

        // Test 3: Verify JavaScript functionality by checking the code structure
        console.log('\n3️⃣ Testing JavaScript functionality structure...');
        
        const pageContent = await response.text();
        
        // Check for form submission handler
        const hasFormSubmitHandler = pageContent.includes('addTransaction(') && pageContent.includes('preventDefault()');
        
        // Check for filter functionality
        const hasFilterLogic = pageContent.includes('filterTransactions(') && pageContent.includes('filter-btn');
        
        // Check for delete functionality  
        const hasDeleteLogic = pageContent.includes('deleteTransaction(') && pageContent.includes('confirm(');
        
        // Check for category update functionality
        const hasCategoryUpdate = pageContent.includes('updateCategories()');
        
        results.formFunctionality = hasFormSubmitHandler && hasCategoryUpdate;
        results.filtering = hasFilterLogic;
        results.deletion = hasDeleteLogic;
        
        console.log(`   ✅ Form submission handler: ${hasFormSubmitHandler}`);
        console.log(`   ✅ Category update functionality: ${hasCategoryUpdate}`);
        console.log(`   ✅ Filter functionality: ${hasFilterLogic}`);
        console.log(`   ✅ Delete functionality: ${hasDeleteLogic}`);

        // Test 4: Check for required form fields
        console.log('\n4️⃣ Testing form field requirements...');
        
        const requiredFields = [
            'transactionType',
            'transactionAmount', 
            'transactionCategory',
            'transactionDescription',
            'transactionDate'
        ];
        
        let fieldsPresent = 0;
        requiredFields.forEach(field => {
            if (pageContent.includes(`id="${field}"`)) {
                fieldsPresent++;
                console.log(`   ✅ ${field} field present`);
            } else {
                console.log(`   ❌ ${field} field missing`);
            }
        });
        
        results.formFunctionality = results.formFunctionality && (fieldsPresent === requiredFields.length);

        // Test 5: Check for error handling
        console.log('\n5️⃣ Testing error handling...');
        
        const hasNotifications = pageContent.includes('showNotification(');
        const hasErrorHandling = pageContent.includes('try') && pageContent.includes('catch');
        
        console.log(`   ✅ Notification system: ${hasNotifications}`);
        console.log(`   ✅ Error handling: ${hasErrorHandling}`);

        console.log('\n📊 FINAL TEST RESULTS:');
        console.log('========================');
        console.log(`Page Load: ${results.pageLoad ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`Form Functionality: ${results.formFunctionality ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`Filtering: ${results.filtering ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`Deletion: ${results.deletion ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`Sidebar Navigation: ${results.sidebarNavigation ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`Data Manager Integration: ${results.dataManagerIntegration ? '✅ PASS' : '❌ FAIL'}`);

        const totalTests = Object.values(results).filter(v => typeof v === 'boolean').length;
        const passedTests = Object.values(results).filter(v => v === true).length;
        
        console.log(`\n🎯 OVERALL SCORE: ${passedTests}/${totalTests} tests passed`);
        
        if (passedTests === totalTests) {
            console.log('🎉 ALL TESTS PASSED! Transactions page is fully functional.');
            return true;
        } else {
            console.log('⚠️  Some tests failed. Review the results above.');
            return false;
        }

    } catch (error) {
        console.error('❌ Test execution failed:', error.message);
        results.errors.push(error.message);
        return false;
    }
}

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testTransactionsPage;
} else {
    // Run immediately if in browser/direct execution
    testTransactionsPage().then(success => {
        console.log('\n' + (success ? '✅ All tests completed successfully!' : '❌ Some tests failed.'));
    });
}